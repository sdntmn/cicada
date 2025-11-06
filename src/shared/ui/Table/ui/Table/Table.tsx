import React, { MutableRefObject, TableHTMLAttributes, useEffect, useState } from "react"

import cn from "classnames"

import { FontSize, RowDensity } from "@/shared/constants"
import { byKey, byKeys, order, setKey, updateParametersKeys } from "@/shared/lib/helpers/sort/sort"
import { Column, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SortType } from "@/shared/lib/types/table"

import { TableSortBody } from "../TableBody"
import { TableHeader } from "../TableHeader"

import "./styles.scss"

export interface Props<T extends RowType> extends TableHTMLAttributes<HTMLTableElement> {
  activeFilterColumns?: keyof T | null
  className?: string
  columnFilters?: Partial<Record<keyof T, string>>
  columns?: Column<T>[]
  filterButtonRefs?: MutableRefObject<Record<string, HTMLButtonElement | null>>
  fontSize?: FontSize
  getRowId?: (row: T) => string | number
  isShowSelection?: boolean
  onFilterIconClick?: (columnName: keyof T) => void
  onRowSelect?: (id: string | number, checked: boolean) => void
  onSelectAll?: (checked: boolean) => void
  rowDensity?: RowDensity
  rows: T[]
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
  striped?: boolean
  verticalBorders?: boolean
}

export const Table = <T extends RowType>({
  activeFilterColumns,
  className = "",
  columnFilters,
  columns,
  filterButtonRefs,
  fontSize = "normal",
  getRowId = (row: T) => row?.id,
  isShowSelection = false,
  onFilterIconClick,
  onRowSelect,
  onSelectAll,
  rowDensity,
  rows,
  selectedRow = new Set(),
  sortByNumberColumns = NumberColumns.ZERO,
  striped = false,
  verticalBorders = false,
  ...rest
}: Props<T>) => {
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
    <table {...rest} className={cn("table", striped && "table__striped", className)}>
      {columns?.length && (
        <TableHeader<T>
          activeFilterColumns={activeFilterColumns}
          columnFilters={columnFilters}
          columns={columns}
          currentKey={currentKey}
          currentKeys={currentKeys}
          filterButtonRefs={filterButtonRefs}
          isAllSelected={safeIsAllSelected}
          isShowSelection={isShowSelection}
          onFilterIconClick={onFilterIconClick}
          onSelectAll={onSelectAll}
          setKeySort={setKeySort}
          sortByNumberColumns={sortByNumberColumns}
          verticalBorders={verticalBorders}
        />
      )}

      {data && (
        <TableSortBody<T>
          columns={columns}
          fontSize={fontSize}
          getRowId={getRowId}
          isShowSelection={isShowSelection}
          nameMainColumnSort={currentKeys?.mainKey?.name}
          onRowSelect={onRowSelect}
          rowDensity={rowDensity}
          rows={data}
          selectedRow={selectedRow}
          sortByNumberColumns={sortByNumberColumns}
          striped={striped}
          verticalBorders={verticalBorders}
        />
      )}
    </table>
  )
}
