import React, { TableHTMLAttributes, useEffect, useState } from "react"

import cn from "classnames"

import { Column, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SortType } from "../../types"
import { byKey, byKeys, getKeysNamesColumns, order, restoreOrder, setKey, updateParametersKeys } from "../../utils"
import { TableSortBody } from "../TableSortBody"
import { TableSortHeader } from "../TableSortHeader"

import "./styles.scss"

export interface TableSortProps<T extends RowType> extends TableHTMLAttributes<HTMLTableElement> {
  /** Дополнительный класс */
  className?: string
  /** Колонки */
  columns?: Column<T>[]
  /** Функция для получения id строки */
  getRowId?: (row: T) => string | number
  /** Показывать номер строки */
  isShowRowIndex?: boolean
  /** Показывать выбор строк */
  isShowSelection?: boolean
  /** Выбор строки */
  onRowSelect?: (id: string | number, checked: boolean) => void
  /** Выбор всех строк */
  onSelectAll?: (checked: boolean) => void
  /** Строки */
  rows: T[]
  /** Выбранная строка */
  selectedRow?: Set<string | number>
  /** Вариант сортировки по столбцам */
  sortByNumberColumns?: NumberColumns
}

export const TableSort: React.FC<TableSortProps<any>> = ({
  className = "",
  columns,
  getRowId = (row: RowType) => row?.id,
  isShowRowIndex = false,
  isShowSelection = false,
  onRowSelect,
  onSelectAll,
  rows,
  selectedRow = new Set(),
  sortByNumberColumns = NumberColumns.ZERO,
  ...rest
}: TableSortProps<any>) => {
  const [currentKey, setCurrentKey] = useState<KeySort<RowType>>()
  const [currentKeys, setCurrentKeys] = useState<KeysSort<RowType>>({})
  const [data, setData] = useState<RowType[]>(rows)
  const [orderAscending, setOrderAscending] = useState<SaveOrder[]>([])
  const [orderDescending, setOrderDescending] = useState<SaveOrder[]>([])

  const sortByOneColumn = (key: KeySort<RowType>): void => {
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

  const sortByTwoColumns = (key: Column<RowType>, updateKeysSort: KeysSort<RowType>): void => {
    setCurrentKeys(updateKeysSort)
    if (Object.keys(updateKeysSort).length === 0) {
      setData(rows)
    }

    const mainKey: KeySort<RowType> | undefined = updateKeysSort?.mainKey
    const secondKey: KeySort<RowType> | undefined = updateKeysSort?.secondKey

    if (key.name === mainKey?.name) {
      {
        setData([...data].sort(byKeys(updateKeysSort)))
      }
    }

    if (key.name === secondKey?.name) {
      if (secondKey?.order !== SortType.NONE && mainKey?.order !== SortType.NONE) {
        setData([...data].sort(byKeys(updateKeysSort)))
        if (!orderAscending.length && mainKey?.order === SortType.ASCENDING) {
          setOrderAscending(order([...data]))
        }
        if (!orderDescending.length && mainKey?.order === SortType.DESCENDING) {
          setOrderDescending(order([...data]))
        }
      }

      if (secondKey?.order === SortType.NONE) {
        if (mainKey?.order === SortType.ASCENDING) {
          setData(restoreOrder(orderAscending, [...data]))
          setOrderAscending([])
        } else {
          setData(restoreOrder(orderDescending, [...data]))
          setOrderDescending([])
        }
      }
    }
  }

  const setKeySort = (key: Column<RowType>): void => {
    if (sortByNumberColumns === NumberColumns.ONE) {
      return sortByOneColumn(setKey(key, currentKey))
    }
    if (sortByNumberColumns === NumberColumns.TWO) {
      const updateKeys = updateParametersKeys(key, currentKeys)
      return sortByTwoColumns(key, updateKeys)
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
        <TableSortHeader
          columns={columns}
          currentKey={currentKey}
          currentKeys={currentKeys}
          isAllSelected={safeIsAllSelected}
          isShowRowIndex={isShowRowIndex}
          isShowSelection={isShowSelection}
          onSelectAll={onSelectAll}
          setKeySort={setKeySort}
          sortByNumberColumns={sortByNumberColumns}
        />
      )}

      {data && (
        <TableSortBody
          arrKeysNameColumns={columns && getKeysNamesColumns(columns)}
          columns={columns}
          getRowId={getRowId}
          isShowRowIndex={isShowRowIndex}
          isShowSelection={isShowSelection}
          nameMainColumnSort={currentKeys?.mainKey?.name}
          onRowSelect={onRowSelect}
          rows={data}
          selectedRow={selectedRow}
          sortByNumberColumns={sortByNumberColumns}
        />
      )}
    </table>
  )
}
