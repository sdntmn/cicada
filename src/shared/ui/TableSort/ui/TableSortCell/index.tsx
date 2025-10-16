import React from "react"

import cn from "classnames"

import { NumberColumns, TextAlign } from "../../types"

import "./styles.scss"

interface TableSortCellProps {
  align?: TextAlign
  isMainColumSort?: boolean
  sortByNumberColumns?: NumberColumns
  value: React.ReactNode
}

export const TableSortCell: React.FC<TableSortCellProps> = ({
  align = "left",
  isMainColumSort,
  sortByNumberColumns,
  value,
  ...rest
}: TableSortCellProps) => (
  <td
    className={cn(
      "itpc-table-sort__cell",
      `itpc-table-sort__cell-align-${align}`,
      isMainColumSort && sortByNumberColumns === NumberColumns.TWO && "itpc-table-sort__cell_back"
    )}
    {...rest}
  >
    {value}
  </td>
)
