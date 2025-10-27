import React, { TableHTMLAttributes, useEffect, useState } from "react"

import cn from "classnames"

import { Account } from "@/entities/Account"
import { RowDensity } from "@/shared/constants"

import { Column, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SortType } from "../../types"
import { byKey, byKeys, order, setKey, updateParametersKeys } from "../../utils"
import { TableSortBody } from "../TableSortBody"
import { TableSortHeader } from "../TableSortHeader"

import "./styles.scss"

export interface TableSortProps<T extends RowType> extends TableHTMLAttributes<HTMLTableElement> {
  activeFilterColumns?: keyof Account | null
  /** Дополнительный класс */
  className?: string

  columnFilters?: Partial<Record<keyof T, string>>
  /** Колонки */
  columns?: Column<T>[]
  /** Функция для получения id строки */
  getRowId?: (row: T) => string | number
  /** Показывать выбор строк */
  isShowSelection?: boolean
  onFilterIconClick?: (columnName: keyof T) => void
  /** Выбор строки */
  onRowSelect?: (id: string | number, checked: boolean) => void
  /** Выбор всех строк */
  onSelectAll?: (checked: boolean) => void
  /** Высота строки */
  rowDensity?: RowDensity
  /** Строки */
  rows: T[]
  /** Выбранная строка */
  selectedRow?: Set<string | number>
  /** Вариант сортировки по столбцам */
  sortByNumberColumns?: NumberColumns
}

export const TableSort = <T extends RowType>({
  activeFilterColumns,
  className = "",
  columnFilters,
  columns,
  getRowId = (row: T) => row?.id,
  isShowSelection = false,
  onFilterIconClick,
  onRowSelect,
  onSelectAll,
  rowDensity,
  rows,
  selectedRow = new Set(),
  sortByNumberColumns = NumberColumns.ZERO,
  ...rest
}: TableSortProps<T>) => {
  const [currentKey, setCurrentKey] = useState<KeySort<T>>()
  const [currentKeys, setCurrentKeys] = useState<KeysSort<T>>({})
  const [data, setData] = useState<T[]>(rows)
  const [orderAscending, setOrderAscending] = useState<SaveOrder[]>([])
  const [orderDescending, setOrderDescending] = useState<SaveOrder[]>([])

  const sortByOneColumn = (key: KeySort<T>): void => {
    setCurrentKey(key)

    switch (key.order) {
      case SortType.ASCENDING:
        setData([...data].sort(byKey(key)))
        break

      case SortType.DESCENDING:
        setData([...data].reverse())
        break

      default:
        setData(rows)
    }
  }

  const sortByTwoColumns = (key: Column<T>, updateKeysSort: KeysSort<T>): void => {
    setCurrentKeys(updateKeysSort)
    if (Object.keys(updateKeysSort).length === 0) {
      setData(rows)
      return
    }

    setData([...data].sort(byKeys(updateKeysSort)))
    const mainKey: KeySort<T> | undefined = updateKeysSort?.mainKey

    if (key.name === mainKey?.name) {
      {
        setData([...data].sort(byKeys(updateKeysSort)))
      }
    }

    if (mainKey) {
      if (mainKey.order === SortType.ASCENDING && !orderAscending.length) {
        setOrderAscending(order([...data]))
      } else if (mainKey.order === SortType.DESCENDING && !orderDescending.length) {
        setOrderDescending(order([...data]))
      }
    }
  }

  const setKeySort = (key: Column<T>): void => {
    if (key.type === "data" && key.isSortable) {
      if (sortByNumberColumns === NumberColumns.ONE) {
        return sortByOneColumn(setKey(key, currentKey))
      }
      if (sortByNumberColumns === NumberColumns.TWO) {
        const updateKeys = updateParametersKeys(key, currentKeys)
        return sortByTwoColumns(key, updateKeys)
      }
    }
  }

  useEffect(() => {
    setData(rows)
  }, [rows])

  const totalRows = rows.length
  const selectedCount = selectedRow.size
  const isAllSelected = totalRows > 0 && selectedCount === totalRows
  const safeIsAllSelected = Boolean(isAllSelected)

  return (
    <table {...rest} className={cn("table-sort", className)}>
      {columns?.length && (
        <TableSortHeader<T>
          activeFilterColumns={activeFilterColumns}
          columnFilters={columnFilters}
          columns={columns}
          currentKey={currentKey}
          currentKeys={currentKeys}
          isAllSelected={safeIsAllSelected}
          isShowSelection={isShowSelection}
          onFilterIconClick={onFilterIconClick}
          onSelectAll={onSelectAll}
          setKeySort={setKeySort}
          sortByNumberColumns={sortByNumberColumns}
        />
      )}

      {data && (
        <TableSortBody<T>
          columns={columns}
          getRowId={getRowId}
          isShowSelection={isShowSelection}
          nameMainColumnSort={currentKeys?.mainKey?.name}
          onRowSelect={onRowSelect}
          rowDensity={rowDensity}
          rows={data}
          selectedRow={selectedRow}
          sortByNumberColumns={sortByNumberColumns}
        />
      )}
    </table>
  )
}
