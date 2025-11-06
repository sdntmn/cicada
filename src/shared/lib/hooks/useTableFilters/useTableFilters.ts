import { useState } from "react"

export const useTableFilters = <T extends Record<string, any>>() => {
  const [activeFilterColumn, setActiveFilterColumn] = useState<keyof T | null>(null)
  const [columnFilters, setColumnFilters] = useState<Partial<Record<keyof T, string>>>({})

  const handleFilterIconClick = (columnName: keyof T) => {
    setActiveFilterColumn(columnName)
  }

  const handleFilterChange = (column: keyof T, value?: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev }
      if (value) {
        newFilters[column] = value
      } else {
        delete newFilters[column]
      }
      return newFilters
    })
  }

  const handleRemoveFilter = (column: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[column]
      return newFilters
    })
  }

  const handleResetAllFilters = () => {
    setColumnFilters({})
    setActiveFilterColumn(null)
  }

  const closeFilter = () => {
    setActiveFilterColumn(null)
  }

  return {
    activeFilterColumn,
    closeFilter,
    columnFilters,
    handleFilterChange,
    handleFilterIconClick,
    handleRemoveFilter,
    handleResetAllFilters,
  }
}
