import { useState } from "react"

import { Column } from "@/shared/lib/types/table"

export type EntityRow = Record<string, unknown>
interface CellState<T> {
  activeCellKey: string | null
  columnName: string | null
  currentCell: HTMLElement | null
  dataRow: null | T
  isOpenViewInfoCell: boolean
}

export interface Identifiable {
  id: string | number
}

export const useCellInteractions = <T extends Identifiable>() => {
  const [cellState, setCellState] = useState<CellState<T>>({
    activeCellKey: null,
    columnName: null,
    currentCell: null,
    dataRow: null,
    isOpenViewInfoCell: false,
  })

  const handleCellClick = (rowData: T, column: Column<T>, e: React.MouseEvent<HTMLTableCellElement>) => {
    // Гарантируем, что column.name — строка
    const columnName = String(column.name)
    const newCellKey = `${(rowData as any).id}-${columnName}`

    if (cellState.isOpenViewInfoCell && cellState.activeCellKey === newCellKey) {
      closePopupInfoCell()
    } else {
      setCellState({
        activeCellKey: newCellKey,
        columnName,
        currentCell: e.currentTarget,
        dataRow: rowData,
        isOpenViewInfoCell: true,
      })
    }
  }

  const closePopupInfoCell = () => {
    setCellState({
      activeCellKey: null,
      columnName: null,
      currentCell: null,
      dataRow: null,
      isOpenViewInfoCell: false,
    })
  }

  return {
    cellState,
    closePopupInfoCell,
    handleCellClick,
  }
}
