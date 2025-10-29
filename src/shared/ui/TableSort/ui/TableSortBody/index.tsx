import React from "react"

import cn from "classnames"

import { FontSize, RowDensity } from "@/shared/constants"

import { Column, NumberColumns, RowType } from "../../types"
import { TableSortRow } from "../TableSortRow"

import "./styles.scss"

interface TableSortBodyProps<T extends RowType> {
  columns?: Column<T>[]
  fontSize?: FontSize
  getRowId?: (row: T) => string | number
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

export const TableSortBody = <T extends RowType>({
  columns,
  fontSize,
  getRowId,
  isShowSelection,
  nameMainColumnSort,
  onRowSelect,
  rowDensity,
  rows,
  selectedRow,
  sortByNumberColumns,
  striped,
  verticalBorders,
  ...rest
}: TableSortBodyProps<T>) => {
  const fontSizeClass = `table-sort-body__font_${fontSize}`
  return (
    <tbody className={cn("table-sort-body", fontSizeClass)} {...rest}>
      {rows.length ? (
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
              striped={striped}
              verticalBorders={verticalBorders}
            />
          )
        })
      ) : (
        <tr>
          <td className="table-sort-body__empty" colSpan={isShowSelection ? columns?.length + 1 || 1 : columns?.length}>
            Нет данных
          </td>
        </tr>
      )}
    </tbody>
  )
}
