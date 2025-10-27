// src/shared/lib/hooks/useTableRowSelection.ts

import { useEffect, useState } from "react"

export const useTableRowSelection = <T extends { id: string | number }>(rows: T[]) => {
  const [selectedRow, setSelectedRow] = useState<Set<string | number>>(new Set())

  // Сброс выделения
  const clearSelection = () => {
    setSelectedRow(new Set())
  }

  // Обработчик выбора строки
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

  // Обработчик "Выбрать всё"
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = rows.map((row) => row.id)
      setSelectedRow(new Set(allIds))
    } else {
      clearSelection()
    }
  }

  // 🔁 Синхронизация: удаляем выделенные ID, которых больше нет в rows
  useEffect(() => {
    const rowIds = new Set(rows.map((row) => row.id))
    setSelectedRow((prev) => {
      const synced = new Set<string | number>()
      for (const id of prev) {
        if (rowIds.has(id)) {
          synced.add(id)
        }
      }
      return synced
    })
  }, [rows])

  return {
    clearSelection, // ← новое
    handleRowSelect,
    handleSelectAll,
    selectedRow,
  }
}
