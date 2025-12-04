import { useState } from "react"

import { Column } from "@/shared/lib/types/table"

import type { InitialData } from "../../types/initialDataTypes"

export const useCellInteractions = () => {
  const [cellState, setCellState] = useState({
    activeCellKey: null as string | null,
    columnName: null as string | null,
    currentCell: null as HTMLElement | null,
    dataRow: null as InitialData | null,
    isOpenViewInfoCell: false,
  })

  const handleCellClick = (rowData: InitialData, column: Column<InitialData>, e: React.MouseEvent<HTMLTableCellElement>) => {
    const newCellKey = `${rowData.id}-${String(column.name)}`

    if (cellState.isOpenViewInfoCell && cellState.activeCellKey === newCellKey) {
      closePopupInfoCell()
    } else {
      setCellState({
        activeCellKey: newCellKey,
        columnName: column.name,
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
