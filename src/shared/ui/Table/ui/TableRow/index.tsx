import React, { useState } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { RowDensity } from "@/shared/constants"
import { Column, NumberColumns, RowType } from "@/shared/lib/types/table"

import { TableBodyCell } from "../TableBodyCell"

import "./styles.scss"

interface Props<T extends RowType> {
  columns?: Column<T>[]
  hasSelectedRows?: boolean
  isChecked?: boolean
  isSelected?: boolean
  isShowSelection?: boolean
  nameMainColumnSort?: keyof T
  onCheck: (checked: boolean) => void
  rowData: T
  rowDensity?: RowDensity
  rowIndex?: number
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
  striped?: boolean
  verticalBorders?: boolean
}

export const TableRow = <T extends RowType>({
  columns,
  hasSelectedRows,
  isSelected,
  isShowSelection,
  nameMainColumnSort,
  onCheck,
  rowData,
  rowDensity,
  rowIndex,
  selectedRow,
  sortByNumberColumns,
  striped,
  verticalBorders,
}: Props<T>) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <tr
      className={cn(
        "table-row",
        isSelected && "table-row__selected",
        rowDensity && `table-row_${rowDensity}`,
        !hasSelectedRows && "table-row__hover-only-checkbox",
        striped && rowIndex !== undefined && rowIndex % 2 === 0 && "table-row__striped"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isShowSelection && onCheck && (
        <td className={cn("table-row__selection-cell", verticalBorders && "table-row__vertical-border")}>
          <Checkbox
            className={cn("table-row__checkbox", (hasSelectedRows || isHovered) && "table-row__checkbox_visible")}
            id={`check-${rowData.id}`}
            isChecked={selectedRow?.has(rowData.id) || false}
            name="row-selection"
            onClick={(e) => onCheck(e.target.checked)}
            type="checkbox"
            variant="square"
          />
        </td>
      )}

      {columns?.map((column) => {
        const align = column.align || "left"
        const isMainColumSort = nameMainColumnSort === column.name

        let cellContent: React.ReactNode

        if (column.type === "virtual") {
          cellContent = column.render?.(rowData, rowIndex) ?? null
        } else {
          const value = rowData[column.name]
          cellContent = column.render ? column.render(value, rowData, rowIndex) : value != null ? String(value) : ""
        }

        return (
          <TableBodyCell
            align={align}
            isMainColumSort={isMainColumSort}
            isSelected={isSelected}
            key={String(column.name)}
            sortByNumberColumns={sortByNumberColumns}
            value={cellContent}
            verticalBorders={verticalBorders}
          />
        )
      })}
    </tr>
  )
}
