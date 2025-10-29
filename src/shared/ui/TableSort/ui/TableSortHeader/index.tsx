import React, { HTMLAttributes } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { Account } from "@/entities/Account"

import { Column, KeySort, KeysSort, NumberColumns, RowType } from "../../types"
import { isColumnActive } from "../../utils"
import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell"

import "./styles.scss"

interface TableSortHeaderProps<T extends RowType> extends HTMLAttributes<HTMLTableCellElement> {
  activeFilterColumns?: keyof Account | null
  columnFilters?: Partial<Record<keyof T, string>>
  columns?: Column<T>[]
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  isAllSelected?: boolean
  isShowSelection?: boolean
  onFilterIconClick?: (columnName: keyof T) => void
  onSelectAll?: (checked: boolean) => void
  setKeySort?: (key: Column<T>) => void
  sortByNumberColumns?: NumberColumns
  verticalBorders?: boolean
}

export const TableSortHeader = <T extends RowType>({
  activeFilterColumns,
  columnFilters,
  columns,
  currentKey,
  currentKeys,
  isAllSelected,
  isShowSelection,
  onFilterIconClick,
  onSelectAll,
  setKeySort,
  sortByNumberColumns,
  verticalBorders,
}: TableSortHeaderProps<T>) => (
  <thead className={cn("table-sort-head")}>
    <tr>
      {isShowSelection && onSelectAll && (
        <th
          className={cn(
            "table-sort-head__selection-cell table-sort-head_background",
            verticalBorders && "table-sort-head__vertical-border"
          )}
        >
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
          const isSortable = column.type === "data" && Boolean(column.isSortable)

          const align = column.type === "data" && column.align

          if (sortByNumberColumns === NumberColumns.ONE || sortByNumberColumns === NumberColumns.TWO) {
            return (
              <TableHeaderCell<T>
                activeFilterColumns={activeFilterColumns}
                column={column}
                columnFilters={columnFilters}
                currentKey={currentKey}
                currentKeys={currentKeys}
                isActive={isActive}
                isSortable={isSortable}
                key={String(column.name) || index}
                onClick={() => setKeySort?.(column)}
                onFilterIconClick={onFilterIconClick}
                sortByNumberColumns={sortByNumberColumns}
                verticalBorders={verticalBorders}
              />
            )
          }

          return (
            <th
              className={cn("table-sort-head__head-no-sort", verticalBorders && "table-sort-head__vertical-border")}
              key={String(column.name) || index}
            >
              <div className={cn("table-sort-head__wrap-cell", `table-sort-head__content-${align || "left"}`)}>{column.title}</div>
            </th>
          )
        })}
    </tr>
  </thead>
)
