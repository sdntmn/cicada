import { useState } from "react"

import { DEFAULT_VISIBLE, REQUIRED_COLUMNS } from "../../constants/columns"
import { buildVisibleColumns } from "../../helpers/buildVisibleColumns/buildVisibleColumns"
import { ColumnTableSelect } from "../../types/table"

export const useAccountTableColumns = () => {
  const [selectedColumns, setSelectedColumns] = useState<Set<ColumnTableSelect>>(new Set(DEFAULT_VISIBLE))

  const visibleColumns = buildVisibleColumns(selectedColumns)

  const handleChangeVisibleColumns = (newSelected: Set<ColumnTableSelect>) => {
    const finalSet = new Set(newSelected)
    REQUIRED_COLUMNS.forEach((col) => finalSet.add(col))
    setSelectedColumns(finalSet)
  }

  return {
    handleChangeVisibleColumns,
    selectedColumns,
    visibleColumns,
  }
}
