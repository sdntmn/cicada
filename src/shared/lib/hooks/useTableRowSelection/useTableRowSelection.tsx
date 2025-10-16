// shared/lib/hooks/useTableRowSelection.ts
import { useState } from "react"

export const useTableRowSelection = <T extends { id: string | number }>(rows: T[]) => {
  const [selectedRow, setSelectedRow] = useState<Set<string | number>>(new Set())

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
      const allIds = rows.map((row) => row.id)
      setSelectedRow(new Set(allIds))
    } else {
      setSelectedRow(new Set())
    }
  }

  return {
    handleRowSelect,
    handleSelectAll,
    selectedRow,
    setSelectedRow,
  }
}
