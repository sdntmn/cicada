import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { Column, NumberColumns, RowType } from "@/shared/lib/types/table"
import { FontSize } from "@/shared/lib/types/types"

import { TableRow } from "../TableRow"

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
        Array.from({ length: rows.length || 10 }).map((_, rowIndex) => (
          <tr className="table-row table-row--skeleton" key={`skeleton-${rowIndex}`}>
            {isShowSelection && (
              <td className={cn("table-row__selection-cell", verticalBorders && "table-row__vertical-border")}>
                <div className="skeleton skeleton--checkbox" />
              </td>
            )}
            {columns?.map((column) => (
              <td
                className={cn(
                  "table-body-cell",
                  `table-body-cell__align-${column.align || "left"}`,
                  verticalBorders && "table-body-cell__vertical-border"
                )}
                key={String(column.name)}
              >
                <div className="skeleton skeleton--text" />
              </td>
            ))}
          </tr>
        ))
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
