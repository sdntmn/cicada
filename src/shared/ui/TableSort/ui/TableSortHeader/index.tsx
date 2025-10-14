import React, { HTMLAttributes } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { Column, KeySort, KeysSort, NumberColumns, RowType } from "../../types"
import { isColumnActive, renderSortIcon } from "../../utils"
import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell"

import "./styles.scss"

interface TableSortHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  columns?: Column<RowType>[]
  currentKey?: KeySort<RowType>
  currentKeys?: KeysSort<RowType>
  isAllSelected?: boolean
  isShowRowIndex?: boolean
  isShowSelection?: boolean
  onSelectAll?: (checked: boolean) => void
  setKeySort?: (key: Column<RowType>) => void
  sortByNumberColumns?: NumberColumns
}

export const TableSortHeader: React.FC<TableSortHeaderProps> = ({
  columns,
  currentKey,
  currentKeys,
  isAllSelected,
  isShowRowIndex,
  isShowSelection,
  onSelectAll,
  setKeySort,
  sortByNumberColumns,
}: TableSortHeaderProps) => (
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
      {isShowRowIndex && (
        <th className={cn("table-sort-head__selection-cell table-sort-head_background")}>
          <div className="table-sort-head__wrap-cell">#</div>
        </th>
      )}

      {columns &&
        columns.map((column: Column<RowType>, index: number) => {
          const isActive = isColumnActive(column, currentKey, currentKeys, sortByNumberColumns)
          const sortIcon = renderSortIcon(column, currentKey, currentKeys, sortByNumberColumns)
          const isSortable = Boolean(column.isSortable)

          if (sortByNumberColumns === NumberColumns.ONE || sortByNumberColumns === NumberColumns.TWO) {
            return (
              <TableHeaderCell
                column={column}
                isActive={isActive}
                isSortable={isSortable}
                key={column.name || index}
                onClick={() => setKeySort?.(column)}
                sortIcon={sortIcon}
              />
            )
          }

          return (
            <th className={cn("table-sort-head__head-no-sort")} key={column.name || index}>
              <div className={cn("table-sort-head__wrap-cell", `table-sort-head__content-${column.align || "left"}`)}>
                {column.title}
              </div>
            </th>
          )
        })}
    </tr>
  </thead>
)
