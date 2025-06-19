import { render, screen } from "@testing-library/react"
import { CurrencyChart } from "@/components/currency-chart"
import type { CurrencyPair, CurrencyData } from "@/types/currency"
import { jest } from "@jest/globals"

// Mock Recharts
jest.mock("recharts", () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
}))

describe("CurrencyChart", () => {
  const mockData: CurrencyData[] = [
    { date: "2024-01-01", USD_EUR: 0.85 },
    { date: "2024-01-02", USD_EUR: 0.86 },
  ]

  const mockCurrencyPairs: CurrencyPair[] = [{ id: "1", base: "USD", target: "EUR" }]

  it("renders line chart by default", () => {
    render(<CurrencyChart data={mockData} currencyPairs={mockCurrencyPairs} chartType="line" />)

    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
  })

  it("renders area chart when specified", () => {
    render(<CurrencyChart data={mockData} currencyPairs={mockCurrencyPairs} chartType="area" />)

    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
  })

  it("renders bar chart when specified", () => {
    render(<CurrencyChart data={mockData} currencyPairs={mockCurrencyPairs} chartType="bar" />)

    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
  })

  it("shows no data message when data is empty", () => {
    render(<CurrencyChart data={[]} currencyPairs={mockCurrencyPairs} chartType="line" />)

    expect(screen.getByText("No data available to display")).toBeInTheDocument()
  })
})
