import React from "react"

import cn from "classnames"
import { Flex } from "itpc-ui-kit"

import { Account } from "@/entities/Accounts"
import { ColumnTableSelect } from "@/widgets/Table/lib/types/table"

import { Column, KeySort, KeysSort, NumberColumns, RowType } from "../../types"
import { SortIcon } from "../SortIcon/SortIcon"

import "./styles.scss"

interface Props<T extends RowType> {
  activeFilterColumns?: keyof Account | null
  column: Column<T>
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  isActive: boolean
  isSortable: boolean
  onClick: (column: Column<T>) => void
  onFilterIconClick?: (columnName: keyof T) => void
  sortByNumberColumns?: NumberColumns
}

export const TableHeaderCell = <T extends RowType>({
  activeFilterColumns,
  column,
  currentKey,
  currentKeys,
  isActive,
  isSortable,
  onClick,
  onFilterIconClick,
  sortByNumberColumns,
}: Props<T>) => {
  const handleSorterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick(column)
  }

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFilterIconClick?.(column.name as keyof T)
  }

  console.log(activeFilterColumns)
  console.log(activeFilterColumns === column.name)

  const isActiveFilter = activeFilterColumns === column.name
  return (
    <th
      className={cn(
        "table-header-cell",
        isSortable ? "table-header-cell_clickable" : "table-header-cell_pointer-none",
        isActive ? "table-header-cell_background-active" : "table-header-cell_background"
      )}
      onClick={isSortable ? handleSorterClick : undefined}
    >
      <div className={cn("table-header-cell__wrap-cell", `table-header-cell__content-${column.align || "left"}`)}>
        {column.title}
        {column.icon}
        <Flex align="center" gap={4}>
          {isSortable && (
            <SortIcon column={column} currentKey={currentKey} currentKeys={currentKeys} sortByNumberColumns={sortByNumberColumns} />
          )}
          {column.isFilterable && column.type === "data" && (
            <button
              className={cn(
                "table-header-cell__btn table-header-cell__btn-filter",
                isActiveFilter && "table-header-cell__btn-filter_active"
              )}
              id={`filter-btn-${String(column.name)}`}
              onClick={handleFilterClick}
              type="button"
            >
              <i
                className={cn(
                  "fa-solid fa-filter table-header-cell__filter-icon",
                  isActiveFilter && "table-header-cell__filter-icon_active"
                )}
              />
            </button>
          )}
        </Flex>
      </div>
    </th>
  )
}
