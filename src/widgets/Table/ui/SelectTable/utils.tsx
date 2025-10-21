import { useMemo } from "react"

import { Account } from "@/entities/Accounts"

export const filteredAndSortedRows = useMemo(
  (sortConfig, filters, accounts) => {
    let result = [...accounts]

    // 1. Фильтрация
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) =>
          String(row[key as keyof Account])
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      }
    })

    // 2. Сортировка
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        // ... логика сравнения
      })
      if (sortConfig.direction === "desc") {
        result.reverse()
      }
    }

    return result
  },
  [accounts, filters, sortConfig]
)
