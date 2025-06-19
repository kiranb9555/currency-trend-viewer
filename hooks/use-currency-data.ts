"use client"

import { useState, useCallback } from "react"
import { format, eachDayOfInterval } from "date-fns"
import type { CurrencyPair, CurrencyData } from "@/types/currency"
import { cacheManager } from "@/lib/cache-manager"

const CACHE_KEY = "currency-data"
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

export function useCurrencyData() {
  const [data, setData] = useState<CurrencyData[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCacheKey = (pairs: CurrencyPair[], from: Date, to: Date) => {
    const pairKeys = pairs
      .map((p) => `${p.base}-${p.target}`)
      .sort()
      .join(",")
    return `${pairKeys}-${format(from, "yyyy-MM-dd")}-${format(to, "yyyy-MM-dd")}`
  }

  const fetchData = useCallback(async (currencyPairs: CurrencyPair[], fromDate: Date, toDate: Date) => {
    const cacheKey = getCacheKey(currencyPairs, fromDate, toDate)

    // Check cache first
    const cachedData = cacheManager.get<CurrencyData[]>(CACHE_KEY, cacheKey)
    if (cachedData) {
      console.log("Using cached data for:", cacheKey)
      setData(cachedData)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result: CurrencyData[] = []

      // Fetch data for each currency pair
      for (const pair of currencyPairs) {
        // Handle identical base & target currencies locally
        if (pair.base === pair.target) {
          const pairKey = `${pair.base}_${pair.target}`

          eachDayOfInterval({ start: fromDate, end: toDate }).forEach((date) => {
            const dateStr = format(date, "yyyy-MM-dd")
            const existingEntry = result.find((item) => item.date === dateStr)

            if (existingEntry) {
              existingEntry[pairKey] = 1
            } else {
              result.push({
                date: dateStr,
                [pairKey]: 1,
              })
            }
          })
          continue
        }

        const fromStr = format(fromDate, "yyyy-MM-dd")
        const toStr = format(toDate, "yyyy-MM-dd")

        // Use Frankfurter API for historical data
        const url = `https://api.frankfurter.app/${fromStr}..${toStr}?from=${pair.base}&to=${pair.target}`

        console.log(`Fetching data from: ${url}`)

        const response = await fetch(url)

        if (!response.ok) {
          console.warn(`Skipping pair ${pair.base}/${pair.target}. API responded with ${response.status}.`)
          continue
        }

        const apiData = await response.json()
        const pairKey = `${pair.base}_${pair.target}`

        // Process the API response
        if (apiData.rates) {
          Object.entries(apiData.rates).forEach(([date, rates]: [string, any]) => {
            const existingEntry = result.find((item) => item.date === date)
            const rate = rates[pair.target]

            if (existingEntry) {
              existingEntry[pairKey] = rate
            } else {
              result.push({
                date,
                [pairKey]: rate,
              })
            }
          })
        }
      }

      // Sort by date
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      console.log("Processed data:", result)
      setData(result)

      // Save to cache
      cacheManager.set(CACHE_KEY, cacheKey, result, CACHE_DURATION)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch currency data"
      setError(errorMessage)
      console.error("Error fetching currency data:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearCache = useCallback(() => {
    cacheManager.clear()
  }, [])

  const getCacheStats = useCallback(() => {
    return cacheManager.getStats(CACHE_KEY)
  }, [])

  return { data, loading, error, fetchData, clearCache, getCacheStats }
}
