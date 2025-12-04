import React from "react"

import cn from "classnames"

import { NumberColumns, TextAlign } from "@/shared/lib/types/table"

import "./styles.scss"

interface Props {
  align?: TextAlign
  isActive?: boolean
  isClickable?: boolean
  isMainColumSort?: boolean
  isSelected?: boolean
  onCellClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void
  sortByNumberColumns?: NumberColumns
  value: React.ReactNode
  verticalBorders?: boolean
}

export const TableBodyCell: React.FC<Props> = ({
  align = "left",
  isActive,
  isClickable,
  isMainColumSort,
  isSelected,
  onCellClick,
  sortByNumberColumns,
  value,
  verticalBorders,
  ...rest
}: Props) => (
  <td
    className={cn(
      "table-body-cell",
      `table-body-cell__align-${align}`,
      isMainColumSort && !isSelected && sortByNumberColumns === NumberColumns.TWO && "table-body-cell_back",
      verticalBorders && "table-body-cell__vertical-border",
      isClickable && "table-body-cell__clickable",
      isActive && "table-body-cell_active"
    )}
    onClick={isClickable ? onCellClick : undefined}
    {...rest}
  >
    {value}
  </td>
)
