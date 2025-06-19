import { cacheManager } from "@/lib/cache-manager"
import jest from "jest"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("CacheManager", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    cacheManager.clear()
  })

  it("should store and retrieve data", () => {
    const testData = { rates: { EUR: 0.85 } }
    const cacheKey = "test-cache"
    const key = "USD-EUR-2024-01-01"

    cacheManager.set(cacheKey, key, testData)
    const retrieved = cacheManager.get(cacheKey, key)

    expect(retrieved).toEqual(testData)
  })

  it("should return null for non-existent keys", () => {
    const result = cacheManager.get("non-existent", "key")
    expect(result).toBeNull()
  })

  it("should respect TTL and expire data", () => {
    const testData = { rates: { EUR: 0.85 } }
    const cacheKey = "test-cache"
    const key = "USD-EUR-2024-01-01"
    const shortTTL = 1 // 1ms

    cacheManager.set(cacheKey, key, testData, shortTTL)

    // Should be available immediately
    expect(cacheManager.get(cacheKey, key)).toEqual(testData)

    // Wait for expiration
    setTimeout(() => {
      expect(cacheManager.get(cacheKey, key)).toBeNull()
    }, 10)
  })

  it("should invalidate specific keys", () => {
    const testData1 = { rates: { EUR: 0.85 } }
    const testData2 = { rates: { GBP: 0.75 } }
    const cacheKey = "test-cache"

    cacheManager.set(cacheKey, "key1", testData1)
    cacheManager.set(cacheKey, "key2", testData2)

    cacheManager.invalidate(cacheKey, "key1")

    expect(cacheManager.get(cacheKey, "key1")).toBeNull()
    expect(cacheManager.get(cacheKey, "key2")).toEqual(testData2)
  })

  it("should provide cache statistics", () => {
    const testData = { rates: { EUR: 0.85 } }
    const cacheKey = "test-cache"

    cacheManager.set(cacheKey, "key1", testData)
    cacheManager.set(cacheKey, "key2", testData)

    const stats = cacheManager.getStats(cacheKey)
    expect(stats.entries).toBe(2)
    expect(stats.totalSize).toBeGreaterThan(0)
  })
})
