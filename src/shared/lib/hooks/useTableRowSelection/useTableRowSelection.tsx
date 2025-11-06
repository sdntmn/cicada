// src/shared/lib/hooks/useTableRowSelection.ts

import { useEffect, useState } from "react"

export const useTableRowSelection = <T,>(rows: T[], getRowId: (row: T) => string | number) => {
  const [selectedRow, setSelectedRow] = useState<Set<string | number>>(new Set())

  const clearSelection = () => {
    setSelectedRow(new Set())
  }

  const handleRowSelect = (id: string | number, checked: boolean) => {
    setSelectedRow((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = rows.map(getRowId)
      setSelectedRow(new Set(allIds))
    } else {
      clearSelection()
    }
  }

  // Синхронизация: удаляем ID, которых больше нет в rows
  useEffect(() => {
    const rowIds = new Set(rows.map(getRowId))
    setSelectedRow((prev) => {
      const synced = new Set<string | number>()
      prev.forEach((id) => {
        if (rowIds.has(id)) {
          synced.add(id)
        }
      })
      return synced
    })
  }, [rows, getRowId])

  return {
    clearSelection,
    handleRowSelect,
    handleSelectAll,
    selectedRow,
  }
}
