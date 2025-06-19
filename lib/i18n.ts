"use client"

export type Locale = "en" | "es" | "fr" | "de" | "ja" | "zh"

export interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Locale, Translations> = {
  en: {
    title: "Currency Trend Viewer",
    subtitle: "Track historical exchange rates with interactive charts",
    configuration: "Configuration",
    configurationDesc: "Select currency pairs and date range to view historical trends",
    currencyPairs: "Currency Pairs",
    addPair: "Add Pair",
    dateRange: "Date Range",
    pickStartDate: "Pick start date",
    pickEndDate: "Pick end date",
    chartType: "Chart Type",
    lineChart: "Line Chart",
    areaChart: "Area Chart",
    barChart: "Bar Chart",
    refreshData: "Refresh Data",
    exportCsv: "Export CSV",
    exchangeRateTrends: "Exchange Rate Trends",
    trendsDesc: "Historical exchange rates from {{from}} to {{to}}",
    loadingData: "Loading exchange rate data...",
    errorLoading: "Error loading data: {{error}}",
    noDataAvailable: "No data available for the selected criteria",
    showingDataPoints: "Showing {{count}} data points for {{pairs}} currency pair(s)",
    testApi: "Test Frankfurter API",
    testing: "Testing...",
    cacheStats: "Cache Statistics",
    clearCache: "Clear Cache",
    entries: "Entries",
    totalSize: "Total Size",
    bytes: "bytes",
  },
  es: {
    title: "Visor de Tendencias de Divisas",
    subtitle: "Rastrea tipos de cambio históricos con gráficos interactivos",
    configuration: "Configuración",
    configurationDesc: "Selecciona pares de divisas y rango de fechas para ver tendencias históricas",
    currencyPairs: "Pares de Divisas",
    addPair: "Agregar Par",
    dateRange: "Rango de Fechas",
    pickStartDate: "Seleccionar fecha de inicio",
    pickEndDate: "Seleccionar fecha final",
    chartType: "Tipo de Gráfico",
    lineChart: "Gráfico de Líneas",
    areaChart: "Gráfico de Área",
    barChart: "Gráfico de Barras",
    refreshData: "Actualizar Datos",
    exportCsv: "Exportar CSV",
    exchangeRateTrends: "Tendencias de Tipos de Cambio",
    trendsDesc: "Tipos de cambio históricos desde {{from}} hasta {{to}}",
    loadingData: "Cargando datos de tipos de cambio...",
    errorLoading: "Error al cargar datos: {{error}}",
    noDataAvailable: "No hay datos disponibles para los criterios seleccionados",
    showingDataPoints: "Mostrando {{count}} puntos de datos para {{pairs}} par(es) de divisas",
    testApi: "Probar API de Frankfurter",
    testing: "Probando...",
    cacheStats: "Estadísticas de Caché",
    clearCache: "Limpiar Caché",
    entries: "Entradas",
    totalSize: "Tamaño Total",
    bytes: "bytes",
  },
  fr: {
    title: "Visualiseur de Tendances des Devises",
    subtitle: "Suivez les taux de change historiques avec des graphiques interactifs",
    configuration: "Configuration",
    configurationDesc: "Sélectionnez les paires de devises et la plage de dates pour voir les tendances historiques",
    currencyPairs: "Paires de Devises",
    addPair: "Ajouter une Paire",
    dateRange: "Plage de Dates",
    pickStartDate: "Choisir la date de début",
    pickEndDate: "Choisir la date de fin",
    chartType: "Type de Graphique",
    lineChart: "Graphique Linéaire",
    areaChart: "Graphique en Aires",
    barChart: "Graphique en Barres",
    refreshData: "Actualiser les Données",
    exportCsv: "Exporter CSV",
    exchangeRateTrends: "Tendances des Taux de Change",
    trendsDesc: "Taux de change historiques du {{from}} au {{to}}",
    loadingData: "Chargement des données de taux de change...",
    errorLoading: "Erreur lors du chargement des données: {{error}}",
    noDataAvailable: "Aucune donnée disponible pour les critères sélectionnés",
    showingDataPoints: "Affichage de {{count}} points de données pour {{pairs}} paire(s) de devises",
    testApi: "Tester l'API Frankfurter",
    testing: "Test en cours...",
    cacheStats: "Statistiques du Cache",
    clearCache: "Vider le Cache",
    entries: "Entrées",
    totalSize: "Taille Totale",
    bytes: "octets",
  },
  de: {
    title: "Währungstrend-Viewer",
    subtitle: "Verfolgen Sie historische Wechselkurse mit interaktiven Diagrammen",
    configuration: "Konfiguration",
    configurationDesc: "Wählen Sie Währungspaare und Datumsbereich, um historische Trends anzuzeigen",
    currencyPairs: "Währungspaare",
    addPair: "Paar hinzufügen",
    dateRange: "Datumsbereich",
    pickStartDate: "Startdatum wählen",
    pickEndDate: "Enddatum wählen",
    chartType: "Diagrammtyp",
    lineChart: "Liniendiagramm",
    areaChart: "Flächendiagramm",
    barChart: "Balkendiagramm",
    refreshData: "Daten aktualisieren",
    exportCsv: "CSV exportieren",
    exchangeRateTrends: "Wechselkurs-Trends",
    trendsDesc: "Historische Wechselkurse vom {{from}} bis {{to}}",
    loadingData: "Lade Wechselkursdaten...",
    errorLoading: "Fehler beim Laden der Daten: {{error}}",
    noDataAvailable: "Keine Daten für die ausgewählten Kriterien verfügbar",
    showingDataPoints: "Zeige {{count}} Datenpunkte für {{pairs}} Währungspaar(e)",
    testApi: "Frankfurter API testen",
    testing: "Teste...",
    cacheStats: "Cache-Statistiken",
    clearCache: "Cache leeren",
    entries: "Einträge",
    totalSize: "Gesamtgröße",
    bytes: "Bytes",
  },
  ja: {
    title: "通貨トレンドビューア",
    subtitle: "インタラクティブなチャートで過去の為替レートを追跡",
    configuration: "設定",
    configurationDesc: "通貨ペアと日付範囲を選択して過去のトレンドを表示",
    currencyPairs: "通貨ペア",
    addPair: "ペアを追加",
    dateRange: "日付範囲",
    pickStartDate: "開始日を選択",
    pickEndDate: "終了日を選択",
    chartType: "チャートタイプ",
    lineChart: "線グラフ",
    areaChart: "エリアチャート",
    barChart: "棒グラフ",
    refreshData: "データを更新",
    exportCsv: "CSV出力",
    exchangeRateTrends: "為替レートトレンド",
    trendsDesc: "{{from}}から{{to}}までの過去の為替レート",
    loadingData: "為替レートデータを読み込み中...",
    errorLoading: "データの読み込みエラー: {{error}}",
    noDataAvailable: "選択した条件のデータがありません",
    showingDataPoints: "{{pairs}}通貨ペアの{{count}}データポイントを表示",
    testApi: "Frankfurter APIをテスト",
    testing: "テスト中...",
    cacheStats: "キャッシュ統計",
    clearCache: "キャッシュをクリア",
    entries: "エントリ",
    totalSize: "合計サイズ",
    bytes: "バイト",
  },
  zh: {
    title: "货币趋势查看器",
    subtitle: "使用交互式图表跟踪历史汇率",
    configuration: "配置",
    configurationDesc: "选择货币对和日期范围以查看历史趋势",
    currencyPairs: "货币对",
    addPair: "添加货币对",
    dateRange: "日期范围",
    pickStartDate: "选择开始日期",
    pickEndDate: "选择结束日期",
    chartType: "图表类型",
    lineChart: "折线图",
    areaChart: "面积图",
    barChart: "柱状图",
    refreshData: "刷新数据",
    exportCsv: "导出CSV",
    exchangeRateTrends: "汇率趋势",
    trendsDesc: "从{{from}}到{{to}}的历史汇率",
    loadingData: "正在加载汇率数据...",
    errorLoading: "加载数据错误: {{error}}",
    noDataAvailable: "所选条件没有可用数据",
    showingDataPoints: "显示{{pairs}}个货币对的{{count}}个数据点",
    testApi: "测试Frankfurter API",
    testing: "测试中...",
    cacheStats: "缓存统计",
    clearCache: "清除缓存",
    entries: "条目",
    totalSize: "总大小",
    bytes: "字节",
  },
}

export function useTranslation(locale: Locale = "en") {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== "string") {
      console.warn(`Translation missing for key: ${key} in locale: ${locale}`)
      return key
    }

    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }

  return { t, locale }
}

export function getAvailableLocales(): { code: Locale; name: string; flag: string }[] {
  return [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]
}
