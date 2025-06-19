"use client"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { format, parseISO } from "date-fns"
import type { CurrencyPair, ChartType, CurrencyData } from "@/types/currency"

interface CurrencyChartProps {
  data: CurrencyData[]
  currencyPairs: CurrencyPair[]
  chartType: ChartType
}

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff", "#00ffff", "#ffff00"]

export function CurrencyChart({ data, currencyPairs, chartType }: CurrencyChartProps) {
  console.log("Chart data:", data)
  console.log("Currency pairs:", currencyPairs)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{format(parseISO(label), "PPP")}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey.replace("_", "/")}: {Number(entry.value).toFixed(4)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const formatXAxisLabel = (tickItem: string) => {
    try {
      return format(parseISO(tickItem), "MMM dd")
    } catch {
      return tickItem
    }
  }

  const formatYAxisLabel = (value: number) => {
    return Number(value).toFixed(4)
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    }

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tickFormatter={formatXAxisLabel} angle={-45} textAnchor="end" height={80} />
            <YAxis tickFormatter={formatYAxisLabel} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {currencyPairs.map((pair, index) => {
              const key = `${pair.base}_${pair.target}`
              return (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  name={`${pair.base}/${pair.target}`}
                />
              )
            })}
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tickFormatter={formatXAxisLabel} angle={-45} textAnchor="end" height={80} />
            <YAxis tickFormatter={formatYAxisLabel} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {currencyPairs.map((pair, index) => {
              const key = `${pair.base}_${pair.target}`
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  name={`${pair.base}/${pair.target}`}
                />
              )
            })}
          </BarChart>
        )

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tickFormatter={formatXAxisLabel} angle={-45} textAnchor="end" height={80} />
            <YAxis tickFormatter={formatYAxisLabel} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {currencyPairs.map((pair, index) => {
              const key = `${pair.base}_${pair.target}`
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name={`${pair.base}/${pair.target}`}
                />
              )
            })}
          </LineChart>
        )
    }
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
        <p>No data available to display</p>
      </div>
    )
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
