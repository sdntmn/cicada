import React from "react"

import { RowDensity } from "@/shared/constants"

import { Column, NumberColumns, RowType } from "../../types"
import { TableSortRow } from "../TableSortRow"

interface TableSortBodyProps<T extends RowType> {
  columns?: Column<T>[]
  getRowId?: (row: T) => string | number
  isShowSelection: boolean
  nameMainColumnSort?: keyof T
  onRowSelect?: (id: string | number, checked: boolean) => void
  rowDensity?: RowDensity
  rows: T[]
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
}

export const TableSortBody = <T extends RowType>({
  columns,
  getRowId,
  isShowSelection,
  nameMainColumnSort,
  onRowSelect,
  rowDensity,
  rows,
  selectedRow,
  sortByNumberColumns,
  ...rest
}: TableSortBodyProps<T>) => (
  <tbody className="itpc-table-sort__body" {...rest}>
    {rows &&
      rows.map((row: T, rowIndex) => {
        const rowId = getRowId(row)
        const isSelected = selectedRow?.has(rowId) || false
        const hasSelectedRows = selectedRow.size > 0

        return (
          <TableSortRow<T>
            columns={columns}
            hasSelectedRows={hasSelectedRows}
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
          />
        )
      })}
  </tbody>
)
