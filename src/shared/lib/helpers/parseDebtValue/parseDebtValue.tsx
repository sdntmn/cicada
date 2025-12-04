import React from "react"

export const parseDebtValue = (value: any): number => {
  if (value == null || value === "") {
    return 0
  }
  const str = String(value).trim()
  if (str === "—" || str === "–" || str === "-") {
    return 0
  }
  const normalized = str.replace(/\s+/g, "").replace(",", ".")
  const num = Number(normalized)
  return isNaN(num) ? 0 : num
}

export const formatCurrency = (value: number): React.ReactNode => {
  const formatted = value.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return <span className="table-header-number">{formatted}</span>
}
