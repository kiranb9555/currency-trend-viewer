"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ApiTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR")
      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>API Test</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={testApi} disabled={loading}>
          {loading ? "Testing..." : "Test Frankfurter API"}
        </Button>
        {testResult && <pre className="mt-4 p-4 bg-muted rounded text-sm overflow-auto">{testResult}</pre>}
      </CardContent>
    </Card>
  )
}
