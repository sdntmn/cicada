import React, { HTMLAttributes, MutableRefObject } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { isColumnActive } from "@/shared/lib/helpers/sort/sort"
import { Column, KeySort, KeysSort, NumberColumns, RowType } from "@/shared/lib/types/table"

import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell"

import "./styles.scss"

interface Props<T extends RowType> extends HTMLAttributes<HTMLTableCellElement> {
  activeFilterColumns?: keyof T | null
  columnFilters?: Partial<Record<keyof T, string>>
  columns?: Column<T>[]
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  filterButtonRefs?: MutableRefObject<Record<string, HTMLButtonElement | null>>
  isAllSelected?: boolean
  isShowSelection?: boolean
  onFilterIconClick?: (columnName: keyof T) => void
  onSelectAll?: (checked: boolean) => void
  setKeySort?: (key: Column<T>) => void
  sortByNumberColumns?: NumberColumns
  verticalBorders?: boolean
}

export const TableHeader = <T extends RowType>({
  activeFilterColumns,
  columnFilters,
  columns,
  currentKey,
  currentKeys,
  filterButtonRefs,
  isAllSelected,
  isShowSelection,
  onFilterIconClick,
  onSelectAll,
  setKeySort,
  sortByNumberColumns,
  verticalBorders,
}: Props<T>) => (
  <thead className={cn("table-head")}>
    <tr>
      {isShowSelection && onSelectAll && (
        <th className={cn("table-head__selection-cell table-head_background", verticalBorders && "table-head__vertical-border")}>
          <div className="table-head__wrap-cell">
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
                activeFilterColumn={activeFilterColumns}
                column={column}
                columnFilters={columnFilters}
                currentKey={currentKey}
                currentKeys={currentKeys}
                filterButtonRef={(el) => (filterButtonRefs.current[String(column.name)] = el)}
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
              className={cn("table-head__head-no-sort", verticalBorders && "table-head__vertical-border")}
              key={String(column.name) || index}
            >
              <div className={cn("table-head__wrap-cell", `table-head__content-${align || "left"}`)}>{column.title}</div>
            </th>
          )
        })}
    </tr>
  </thead>
)
