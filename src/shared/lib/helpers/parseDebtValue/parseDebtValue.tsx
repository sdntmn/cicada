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

export const formatCurrencyString = (value: number): string => {
  if (isNaN(value) || value == null) {
    return "0,00"
  }
  return value.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}

export const formatCurrencyNode = (value: number): React.ReactNode => {
  const formatted = formatCurrencyString(value)
  return <span className="table-header-number">{formatted}</span>
}

export const formatInteger = (value: number): string => {
  if (isNaN(value) || value == null) {
    return "0"
  }

  const integer = Math.floor(Math.abs(value))
  return integer.toLocaleString("ru-RU")
}

export const parseTermValue = (value: any): number => {
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
