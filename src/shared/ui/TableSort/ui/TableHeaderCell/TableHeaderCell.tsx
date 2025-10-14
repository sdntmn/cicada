import React from "react"

import cn from "classnames"

import { Column, RowType } from "../../types"

import "./styles.scss"

interface Props {
  column: Column<RowType>
  isActive: boolean
  isSortable: boolean
  onClick: () => void
  sortIcon: React.ReactNode
}

export const TableHeaderCell: React.FC<Props> = ({ column, isActive, isSortable, onClick, sortIcon }) => (
  <th
    className={cn(
      "table-header-cell",
      isSortable ? "table-header-cell_clickable" : "table-header-cell_pointer-none",
      isActive ? "table-header-cell_background-active" : "table-header-cell_background"
    )}
    onClick={isSortable ? onClick : undefined}
  >
    <div className={cn("table-header-cell__wrap-cell", `table-header-cell__content-${column.align || "left"}`)}>
      {column.title}
      {column.icon}
      {sortIcon}
    </div>
  </th>
)
