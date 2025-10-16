import React from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { RowDensity } from "@/shared/constants"

import { Column, NumberColumns, RowType } from "../../types"
import { TableSortCell } from "../TableSortCell"

import "./styles.scss"

interface TableSortRowProps<T extends RowType> {
  columns?: Column<T>[]
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
}

export const TableSortRow = <T extends RowType>({
  columns,
  isSelected,
  isShowSelection,
  nameMainColumnSort,
  onCheck,
  rowData,
  rowDensity,
  rowIndex,
  selectedRow,
  sortByNumberColumns,
}: TableSortRowProps<T>) => (
  <tr className={cn("table-sort-row", isSelected && "table-sort-row__selected", rowDensity && `table-sort-row_${rowDensity}`)}>
    {isShowSelection && onCheck && (
      <td className="table-sort-row__selection-cell">
        <Checkbox
          className="table-sort-checkbox"
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
        <TableSortCell
          align={align}
          isMainColumSort={isMainColumSort}
          key={String(column.name)}
          sortByNumberColumns={sortByNumberColumns}
          value={cellContent}
        />
      )
    })}
  </tr>
)
