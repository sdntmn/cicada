import { useMemo, useState } from "react"

interface TableColumnsConfig<C extends string, V extends string = string> {
  defaultVisible: (C | V)[]
  displayOrder: (C | V)[]
  requiredColumns: Set<C | V>
}

export const useTableColumns = <C extends string, V extends string = string>(config: TableColumnsConfig<C, V>) => {
  const { defaultVisible, displayOrder, requiredColumns } = config

  const [selectedColumns, setSelectedColumns] = useState<Set<C | V>>(() => {
    const initial = new Set(defaultVisible)
    requiredColumns.forEach((col) => initial.add(col))
    return initial
  })

  // Сохраняем порядок из displayOrder
  const visibleColumns = useMemo(() => displayOrder.filter((col) => selectedColumns.has(col)), [selectedColumns, displayOrder])

  const handleChangeVisibleColumns = (newSelected: Set<C | V>) => {
    const finalSet = new Set(newSelected)
    requiredColumns.forEach((col) => finalSet.add(col))
    setSelectedColumns(finalSet)
  }

  return {
    handleChangeVisibleColumns,
    selectedColumns,
    visibleColumns,
  }
}
