"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, CalendarIcon, Download, Plus, X, Moon, Sun } from "lucide-react"
import { format, subDays, isAfter, isBefore } from "date-fns"
import { cn } from "@/lib/utils"
import { CurrencyChart } from "@/components/currency-chart"
import { useCurrencyData } from "@/hooks/use-currency-data"
import { useTheme } from "@/components/theme-provider"
import { currencies } from "@/lib/currencies"
import type { CurrencyPair, ChartType } from "@/types/currency"
import { ApiTest } from "@/components/api-test"
import { useTranslation } from "@/lib/i18n"
import { useLocale } from "@/hooks/use-locale"
import { LanguageSelector } from "@/components/language-selector"
import { CacheManagerUI } from "@/components/cache-manager-ui"

export function CurrencyTrendViewer() {
  const { locale, changeLocale } = useLocale()
  const { t } = useTranslation(locale)
  const { theme, setTheme } = useTheme()
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([{ id: "1", base: "USD", target: "EUR" }])
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [chartType, setChartType] = useState<ChartType>("line")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { data, loading, error, fetchData } = useCurrencyData()

  useEffect(() => {
    if (currencyPairs.length > 0 && dateRange.from && dateRange.to) {
      console.log("Fetching data for:", { currencyPairs, dateRange })
      fetchData(currencyPairs, dateRange.from, dateRange.to)
    }
  }, [currencyPairs, dateRange, fetchData])

  const addCurrencyPair = () => {
    const newPair: CurrencyPair = {
      id: Date.now().toString(),
      base: "USD",
      target: "EUR",
    }
    setCurrencyPairs([...currencyPairs, newPair])
  }

  const removeCurrencyPair = (id: string) => {
    if (currencyPairs.length > 1) {
      setCurrencyPairs(currencyPairs.filter((pair) => pair.id !== id))
    }
  }

  const updateCurrencyPair = (id: string, field: "base" | "target", value: string) => {
    setCurrencyPairs(currencyPairs.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair)))
  }

  const handleDateSelect = (date: Date | undefined, type: "from" | "to") => {
    if (!date) return

    if (type === "from") {
      setDateRange((prev) => ({ ...prev, from: date }))
    } else {
      setDateRange((prev) => ({ ...prev, to: date }))
    }
  }

  const exportData = () => {
    if (!data || data.length === 0) return

    const csvContent = [
      ["Date", ...currencyPairs.map((pair) => `${pair.base}/${pair.target}`)].join(","),
      ...data.map((item) =>
        [
          item.date,
          ...currencyPairs.map((pair) => {
            const key = `${pair.base}_${pair.target}`
            return item[key] || ""
          }),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `currency-data-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector locale={locale} onLocaleChange={changeLocale} />
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <>
          <ApiTest />
          <CacheManagerUI />
        </>
      )}

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>{t("configuration")}</CardTitle>
          <CardDescription>{t("configurationDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Currency Pairs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">{t("currencyPairs")}</Label>
              <Button onClick={addCurrencyPair} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {t("addPair")}
              </Button>
            </div>

            <div className="grid gap-4">
              {currencyPairs.map((pair) => (
                <div key={pair.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 flex-1">
                    <Select value={pair.base} onValueChange={(value) => updateCurrencyPair(pair.id, "base", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-muted-foreground">/</span>

                    <Select value={pair.target} onValueChange={(value) => updateCurrencyPair(pair.id, "target", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Badge variant="secondary">
                    {pair.base}/{pair.target}
                  </Badge>

                  {currencyPairs.length > 1 && (
                    <Button onClick={() => removeCurrencyPair(pair.id)} size="sm" variant="ghost">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <Label className="text-base font-medium">{t("dateRange")}</Label>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "PPP") : t("pickStartDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => handleDateSelect(date, "from")}
                    disabled={(date) => isAfter(date, new Date()) || (dateRange.to && isAfter(date, dateRange.to))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "PPP") : t("pickEndDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => handleDateSelect(date, "to")}
                    disabled={(date) => isAfter(date, new Date()) || (dateRange.from && isBefore(date, dateRange.from))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Chart Type */}
          <div className="space-y-4">
            <Label className="text-base font-medium">{t("chartType")}</Label>
            <Tabs value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
              <TabsList>
                <TabsTrigger value="line">{t("lineChart")}</TabsTrigger>
                <TabsTrigger value="area">{t("areaChart")}</TabsTrigger>
                <TabsTrigger value="bar">{t("barChart")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={() => fetchData(currencyPairs, dateRange.from, dateRange.to)} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("refreshData")}
            </Button>
            <Button onClick={exportData} variant="outline" disabled={!data || data.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              {t("exportCsv")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("exchangeRateTrends")}</CardTitle>
          <CardDescription>
            {t("trendsDesc", { from: format(dateRange.from, "PPP"), to: format(dateRange.to, "PPP") })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">{t("loadingData")}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64 text-destructive">
              <p>{t("errorLoading", { error })}</p>
            </div>
          )}

          {!loading && !error && data && data.length > 0 && (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                {t("showingDataPoints", { count: data.length, pairs: currencyPairs.length })}
              </div>
              <CurrencyChart data={data} currencyPairs={currencyPairs} chartType={chartType} />
            </>
          )}

          {!loading && !error && (!data || data.length === 0) && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>{t("noDataAvailable")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
