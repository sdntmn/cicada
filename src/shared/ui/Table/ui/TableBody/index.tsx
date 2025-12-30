import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { Column, NumberColumns, RowType } from "@/shared/lib/types/table"
import { FontSize } from "@/shared/lib/types/types"

import { TableRow } from "../TableRow"
import { TableSkeletonRows } from "../TableSkeletonRows/TableSkeletonRows"

import "./styles.scss"

interface Props<T extends RowType> {
  activeCellKey?: string
  columns?: Column<T>[]
  fontSize?: FontSize
  isLoading: boolean
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
  fontSize = "normal",
  isLoading,
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
  ...rest
}: Props<T>) => {
  const fontSizeClass = `table-body__font_${fontSize}`
  return (
    <tbody className={cn("table-body", fontSizeClass)} {...rest}>
      {isLoading ? (
        <TableSkeletonRows
          columns={columns}
          fontSize={fontSize}
          isShowSelection={isShowSelection}
          rowCount={rows.length || 10}
          rowDensity={rowDensity}
          verticalBorders={verticalBorders}
        />
      ) : rows.length ? (
        rows.map((row: T, rowIndex) => {
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
        })
      ) : (
        <tr>
          <td className="table-body__empty" colSpan={isShowSelection ? (columns?.length || 0) + 1 : columns?.length || 1}>
            Нет данных
          </td>
        </tr>
      )}
    </tbody>
  )
}
