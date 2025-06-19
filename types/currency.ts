export interface CurrencyPair {
  id: string
  base: string
  target: string
}

export interface CurrencyData {
  date: string
  [key: string]: string | number
}

export type ChartType = "line" | "area" | "bar"

export interface Currency {
  code: string
  name: string
  symbol?: string
}
