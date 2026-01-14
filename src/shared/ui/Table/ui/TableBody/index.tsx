import React from "react"

import { RowDensity } from "@/shared/constants"
import { Column, NumberColumns, RowType } from "@/shared/lib/types/table"

import { TableRow } from "../TableRow"

import "./styles.scss"

interface Props<T extends RowType> {
  activeCellKey?: string
  columns?: Column<T>[]
  isOpenExpandedInfoCell?: boolean
  isShowSelection: boolean
  nameMainColumnSort?: keyof T
  onRowSelect?: (id: string | number, checked: boolean) => void
  rowDensity?: RowDensity
  rows: T[]
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
  striped?: boolean
  verticalBorders?: boolean
}

export const TableBody = <T extends RowType>({
  activeCellKey,
  columns,
  isOpenExpandedInfoCell,
  isShowSelection,
  nameMainColumnSort,
  onRowSelect,
  rowDensity,
  rows,
  selectedRow,
  sortByNumberColumns,
  striped,
  verticalBorders,
}: Props<T>) => (
  <>
    {rows.map((row, rowIndex) => {
      const rowId = row.id
      const isSelected = selectedRow?.has(rowId) || false
      const hasSelectedRows = selectedRow && selectedRow.size > 0

      return (
        <TableRow<T>
          activeCellKey={activeCellKey}
          columns={columns}
          hasSelectedRows={hasSelectedRows}
          isOpenExpandedInfoCell={isOpenExpandedInfoCell}
          isSelected={isSelected}
          isShowSelection={isShowSelection}
          key={rowId}
          nameMainColumnSort={nameMainColumnSort}
          onCheck={(checked) => onRowSelect?.(rowId, checked)}
          rowData={row}
          rowDensity={rowDensity}
          rowIndex={rowIndex}
          selectedRow={selectedRow}
          sortByNumberColumns={sortByNumberColumns}
          striped={striped}
          verticalBorders={verticalBorders}
        />
      )
    })}
  </>
)
