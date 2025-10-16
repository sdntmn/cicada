import React, { HTMLAttributes } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { Column, KeySort, KeysSort, NumberColumns, RowType } from "../../types"
import { isColumnActive, renderSortIcon } from "../../utils"
import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell"

import "./styles.scss"

interface TableSortHeaderProps<T extends RowType> extends HTMLAttributes<HTMLTableCellElement> {
  columns?: Column<T>[]
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  isAllSelected?: boolean
  isShowSelection?: boolean
  onSelectAll?: (checked: boolean) => void
  setKeySort?: (key: Column<T>) => void
  sortByNumberColumns?: NumberColumns
}

export const TableSortHeader = <T extends RowType>({
  columns,
  currentKey,
  currentKeys,
  isAllSelected,
  isShowSelection,
  onSelectAll,
  setKeySort,
  sortByNumberColumns,
}: TableSortHeaderProps<T>) => (
  <thead className={cn("table-sort-head")}>
    <tr>
      {isShowSelection && onSelectAll && (
        <th className="table-sort-head__selection-cell table-sort-head_background">
          <div className="table-sort-head__wrap-cell">
            <Checkbox
              className="table-sort-checkbox"
              id="select-all-checkbox"
              isChecked={isAllSelected}
              key={`select-all-${isAllSelected ? "checked" : "unchecked"}`}
              name="select-all"
              onClick={(e) => onSelectAll?.(e.target.checked)}
              type="checkbox"
              variant="square"
            />
          </div>
        </th>
      )}

      {columns &&
        columns.map((column: Column<T>, index: number) => {
          const isActive = isColumnActive(column, currentKey, currentKeys, sortByNumberColumns)
          const sortIcon = renderSortIcon(column, currentKey, currentKeys, sortByNumberColumns)
          const isSortable = column.type === "data" && Boolean(column.isSortable)

          const align = column.type === "data" && column.align

          if (sortByNumberColumns === NumberColumns.ONE || sortByNumberColumns === NumberColumns.TWO) {
            return (
              <TableHeaderCell<T>
                column={column}
                isActive={isActive}
                isSortable={isSortable}
                key={String(column.name) || index}
                onClick={() => setKeySort?.(column)}
                sortIcon={sortIcon}
              />
            )
          }

          return (
            <th className={cn("table-sort-head__head-no-sort")} key={String(column.name) || index}>
              <div className={cn("table-sort-head__wrap-cell", `table-sort-head__content-${align || "left"}`)}>{column.title}</div>
            </th>
          )
        })}
    </tr>
  </thead>
)
