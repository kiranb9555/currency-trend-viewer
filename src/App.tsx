import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyTrendViewer } from "@/components/currency-trend-viewer"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <CurrencyTrendViewer />
      </div>
    </ThemeProvider>
  )
}

export default App
