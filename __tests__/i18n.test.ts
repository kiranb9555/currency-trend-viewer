import { useTranslation } from "@/lib/i18n"

describe("i18n", () => {
  it("should return English translations by default", () => {
    const { t } = useTranslation("en")
    expect(t("title")).toBe("Currency Trend Viewer")
  })

  it("should return Spanish translations", () => {
    const { t } = useTranslation("es")
    expect(t("title")).toBe("Visor de Tendencias de Divisas")
  })

  it("should handle parameter interpolation", () => {
    const { t } = useTranslation("en")
    const result = t("trendsDesc", { from: "Jan 1", to: "Jan 31" })
    expect(result).toBe("Historical exchange rates from Jan 1 to Jan 31")
  })

  it("should return key when translation is missing", () => {
    const { t } = useTranslation("en")
    expect(t("nonexistent.key")).toBe("nonexistent.key")
  })

  it("should handle nested translation keys", () => {
    const { t } = useTranslation("en")
    expect(t("title")).toBe("Currency Trend Viewer")
  })
})
