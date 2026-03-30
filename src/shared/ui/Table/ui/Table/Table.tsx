import React, { MutableRefObject, TableHTMLAttributes, useCallback, useEffect, useRef, useState } from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { byKey, byKeys, order, setKey, updateParametersKeys } from "@/shared/lib/helpers/sort/sort"
import { Column, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SortType } from "@/shared/lib/types/table"
import { FontSize } from "@/shared/lib/types/types"

import { TableBody } from "../TableBody"
import { TableHeader } from "../TableHeader"
import { TableSkeletonRows } from "../TableSkeletonRows/TableSkeletonRows"

import "./styles.scss"

export interface Props<T extends RowType> extends TableHTMLAttributes<HTMLTableElement> {
  activeCellKey?: string
  activeFilterColumns?: keyof T | null
  className?: string
  columnFilters?: Partial<Record<keyof T, string>>
  columns?: Column<T>[]
  filterButtonRefs?: MutableRefObject<Record<string, HTMLButtonElement | null>>
  fontSize?: FontSize
  isLoading?: boolean
  isOpenExpandedInfoCell?: boolean
  isShowSelection?: boolean
  onFilterIconClick?: (columnName: keyof T | string) => void
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
  activeCellKey,
  activeFilterColumns,
  className = "",
  columnFilters,
  columns,
  filterButtonRefs,
  fontSize = "normal",
  isLoading = false,
  isOpenExpandedInfoCell,
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
  const theadRef = useRef<HTMLTableSectionElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const [columnWidths, setColumnWidths] = useState<number[]>([])
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
        setData([...data].sort(byKey(key)))
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

  const measureColumnWidths = useCallback(() => {
    if (!theadRef.current || !columns?.length) {
      return
    }

    const thElements = theadRef.current.querySelectorAll("th")
    const widths: number[] = []

    thElements.forEach((th) => {
      const rect = th.getBoundingClientRect()
      // Получаем реальную ширину элемента с учетом padding, border
      const computedStyle = window.getComputedStyle(th)
      const width = rect.width
      // Вычитаем padding если нужно точное значение для content
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0
      const contentWidth = width - paddingLeft - paddingRight

      widths.push(contentWidth > 0 ? contentWidth : width)
    })

    // Обновляем только если есть изменения
    if (widths.length > 0 && JSON.stringify(widths) !== JSON.stringify(columnWidths)) {
      setColumnWidths(widths)
    }
  }, [columns, columnWidths])

  const handleColumnWidthsReady = (widths: number[]) => {
    setColumnWidths(widths)
  }

  useEffect(() => {
    setData(rows)
  }, [rows])

  useEffect(() => {
    // Замеряем после монтирования
    const timer = setTimeout(() => {
      measureColumnWidths()
    }, 100)

    // Создаем ResizeObserver для отслеживания изменений размеров
    if ("ResizeObserver" in window) {
      resizeObserverRef.current = new ResizeObserver(() => {
        measureColumnWidths()
      })

      if (theadRef.current) {
        resizeObserverRef.current.observe(theadRef.current)
      }
    }

    return () => {
      clearTimeout(timer)
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [measureColumnWidths])

  useEffect(() => {
    measureColumnWidths()
  }, [columns, isShowSelection, measureColumnWidths])

  const totalRows = rows.length
  const selectedCount = selectedRow.size
  const isAllSelected = totalRows > 0 && selectedCount === totalRows
  const safeIsAllSelected = Boolean(isAllSelected)

  const renderSkeleton = () => (
    <TableSkeletonRows
      columns={columns}
      columnWidths={columnWidths.length > 0 ? columnWidths : undefined}
      fontSize={fontSize}
      isShowSelection={isShowSelection}
      rowCount={rows.length || 10}
      rowDensity={rowDensity}
      verticalBorders={verticalBorders}
    />
  )

  const renderEmptyState = () => {
    const colSpan = (columns?.length || 0) + (isShowSelection ? 1 : 0)
    return (
      <tr>
        <td className="table-body__empty" colSpan={colSpan}>
          Нет данных
        </td>
      </tr>
    )
  }

  const renderData = () => (
    <TableBody
      activeCellKey={activeCellKey}
      columns={columns}
      isOpenExpandedInfoCell={isOpenExpandedInfoCell}
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
  )

  const tableBodyContent = isLoading ? renderSkeleton() : !data.length ? renderEmptyState() : renderData()

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
          onColumnWidthsReady={handleColumnWidthsReady}
          onFilterIconClick={onFilterIconClick}
          onSelectAll={onSelectAll}
          ref={theadRef}
          setKeySort={setKeySort}
          sortByNumberColumns={sortByNumberColumns}
          verticalBorders={verticalBorders}
        />
      )}

      <tbody className={`table-body table-body__font_${fontSize}`}>{tableBodyContent}</tbody>
    </table>
  )
}
