// TableSkeletonRows.tsx
import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { Column, RowType } from "@/shared/lib/types/table"
import { FontSize } from "@/shared/lib/types/types"

interface TableSkeletonRowsProps<T extends RowType> {
  columns?: Column<T>[]
  fontSize?: FontSize
  isShowSelection: boolean
  rowCount?: number
  rowDensity?: RowDensity
  verticalBorders?: boolean
}

export const TableSkeletonRows = <T extends RowType>({
  columns,
  fontSize = "normal",
  isShowSelection,
  rowCount = 10,
  rowDensity,
  verticalBorders = false,
}: TableSkeletonRowsProps<T>) => {
  console.info(rowDensity)
  console.info(fontSize)
  // Вы можете использовать rowDensity и fontSize для задания классов,
  // которые влияют на высоту строки через CSS
  const rowClass = cn(
    "table-row",
    "table-row--skeleton",
    rowDensity && `table-row--density-${rowDensity}`,
    fontSize && `table-row--font-${fontSize}`
  )

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr className={rowClass} key={`skeleton-${rowIndex}`}>
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
      ))}
    </>
  )
}
