interface CacheEntry<T> {
  data: T
  timestamp: number
  key: string
  ttl: number
}

class CacheManager {
  private static instance: CacheManager
  private caches: Map<string, CacheEntry<any>[]> = new Map()

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  set<T>(cacheKey: string, key: string, data: T, ttl = 3600000): void {
    try {
      const cache = this.caches.get(cacheKey) || []

      // Remove existing entry with same key
      const filteredCache = cache.filter((entry) => entry.key !== key)

      // Add new entry
      filteredCache.push({
        key,
        data,
        timestamp: Date.now(),
        ttl,
      })

      // Keep only last 20 entries per cache
      if (filteredCache.length > 20) {
        filteredCache.splice(0, filteredCache.length - 20)
      }

      this.caches.set(cacheKey, filteredCache)

      // Persist to localStorage
      localStorage.setItem(`cache_${cacheKey}`, JSON.stringify(filteredCache))
    } catch (error) {
      console.warn("Failed to save to cache:", error)
    }
  }

  get<T>(cacheKey: string, key: string): T | null {
    try {
      let cache = this.caches.get(cacheKey)

      // Try to load from localStorage if not in memory
      if (!cache) {
        const stored = localStorage.getItem(`cache_${cacheKey}`)
        if (stored) {
          cache = JSON.parse(stored)
          this.caches.set(cacheKey, cache!)
        }
      }

      if (!cache) return null

      const entry = cache.find((e) => e.key === key)

      if (entry && Date.now() - entry.timestamp < entry.ttl) {
        return entry.data
      }

      // Remove expired entry
      if (entry) {
        this.invalidate(cacheKey, key)
      }

      return null
    } catch (error) {
      console.warn("Failed to read from cache:", error)
      return null
    }
  }

  invalidate(cacheKey: string, key?: string): void {
    try {
      if (key) {
        const cache = this.caches.get(cacheKey)
        if (cache) {
          const filteredCache = cache.filter((entry) => entry.key !== key)
          this.caches.set(cacheKey, filteredCache)
          localStorage.setItem(`cache_${cacheKey}`, JSON.stringify(filteredCache))
        }
      } else {
        this.caches.delete(cacheKey)
        localStorage.removeItem(`cache_${cacheKey}`)
      }
    } catch (error) {
      console.warn("Failed to invalidate cache:", error)
    }
  }

  clear(): void {
    try {
      this.caches.clear()
      // Clear all cache entries from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cache_")) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn("Failed to clear cache:", error)
    }
  }

  getStats(cacheKey: string): { entries: number; totalSize: number } {
    const cache = this.caches.get(cacheKey) || []
    const totalSize = JSON.stringify(cache).length
    return { entries: cache.length, totalSize }
  }
}

export const cacheManager = CacheManager.getInstance()
