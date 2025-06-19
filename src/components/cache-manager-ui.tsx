"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Database } from "lucide-react"
import { useCurrencyData } from "@/hooks/use-currency-data"
import { useTranslation } from "@/lib/i18n"
import { useLocale } from "@/hooks/use-locale"

export function CacheManagerUI() {
  const { locale } = useLocale()
  const { t } = useTranslation(locale)
  const { clearCache, getCacheStats } = useCurrencyData()
  const [stats, setStats] = useState({ entries: 0, totalSize: 0 })

  useEffect(() => {
    const updateStats = () => {
      setStats(getCacheStats())
    }
    updateStats()
    const interval = setInterval(updateStats, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [getCacheStats])

  const handleClearCache = () => {
    clearCache()
    setStats({ entries: 0, totalSize: 0 })
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 " + t("bytes")
    const k = 1024
    const sizes = [t("bytes"), "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          {t("cacheStats")}
        </CardTitle>
        <CardDescription>Monitor and manage cached currency data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("entries")}:</span>
              <Badge variant="secondary">{stats.entries}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t("totalSize")}:</span>
              <Badge variant="secondary">{formatBytes(stats.totalSize)}</Badge>
            </div>
          </div>
          <Button onClick={handleClearCache} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            {t("clearCache")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
