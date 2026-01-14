// TableSkeletonRows.tsx
import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { Column, RowType } from "@/shared/lib/types/table"
import { FontSize } from "@/shared/lib/types/types"

import "./styles.scss"

interface TableSkeletonRowsProps<T extends RowType> {
  columns?: Column<T>[]
  columnWidths?: number[]
  fontSize?: FontSize
  isShowSelection: boolean
  rowCount?: number
  rowDensity?: RowDensity
  verticalBorders?: boolean
}

export const TableSkeletonRows = <T extends RowType>({
  columns,
  columnWidths,
  fontSize = "normal",
  isShowSelection,
  rowCount = 10,
  rowDensity,
  verticalBorders = false,
}: TableSkeletonRowsProps<T>) => {
  const rowClass = cn(
    "table-row-skeleton",
    rowDensity && `table-row-skeleton__density_${rowDensity}`,
    fontSize && `table-row-skeleton_${fontSize}`
  )

  const hasExactWidths = columnWidths && columnWidths.length > 0

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr className={rowClass} key={`skeleton-${rowIndex}`}>
          {isShowSelection && (
            <td
              style={
                hasExactWidths && columnWidths[0]
                  ? {
                      minWidth: `${columnWidths[0]}px`,
                      width: `${columnWidths[0]}px`,
                    }
                  : undefined
              }
              className={cn("table-row__selection-cell", verticalBorders && "table-row__vertical-border")}
            >
              <div className="skeleton skeleton--checkbox" />
            </td>
          )}
          {columns?.map((column, colIndex) => {
            const thIndex = isShowSelection ? colIndex + 1 : colIndex
            const width = hasExactWidths ? columnWidths[thIndex] : undefined

            return (
              <td
                className={cn(
                  "table-body-cell",
                  `table-body-cell__align-${column.align || "left"}`,
                  verticalBorders && "table-body-cell__vertical-border"
                )}
                style={
                  width
                    ? {
                        maxWidth: `${width}px`, // Добавляем maxWidth для точного соответствия
                        minWidth: `${width}px`,
                        width: `${width}px`,
                      }
                    : undefined
                }
                key={String(column.name)}
              >
                <div className="skeleton skeleton--text" />
              </td>
            )
          })}
        </tr>
      ))}
    </>
  )
}
