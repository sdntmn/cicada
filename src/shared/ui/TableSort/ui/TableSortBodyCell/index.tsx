import React from "react"

import cn from "classnames"

import { NumberColumns, TextAlign } from "../../types"

import "./styles.scss"

interface TableSortCellProps {
  align?: TextAlign
  isMainColumSort?: boolean
  isSelected?: boolean
  sortByNumberColumns?: NumberColumns
  value: React.ReactNode
  verticalBorders?: boolean
}

export const TableSortBodyCell: React.FC<TableSortCellProps> = ({
  align = "left",
  isMainColumSort,
  isSelected,
  sortByNumberColumns,
  value,
  verticalBorders,
  ...rest
}: TableSortCellProps) => (
  <td
    className={cn(
      "table-body-cell",
      `table-body-cell__align-${align}`,
      isMainColumSort && !isSelected && sortByNumberColumns === NumberColumns.TWO && "table-body-cell_back",
      verticalBorders && "table-body-cell__vertical-border"
    )}
    {...rest}
  >
    {value}
  </td>
)
