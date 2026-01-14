import React, { type ForwardedRef, forwardRef, HTMLAttributes, MutableRefObject, useEffect, useRef } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { isColumnActive } from "@/shared/lib/helpers/sort/sort"
import { Column, KeySort, KeysSort, NumberColumns, RowType } from "@/shared/lib/types/table"

import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell"

import "./styles.scss"

interface Props<T extends RowType> extends HTMLAttributes<HTMLTableSectionElement> {
  activeFilterColumns?: keyof T | null
  columnFilters?: Partial<Record<keyof T, string>>
  columns?: Column<T>[]
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  filterButtonRefs?: MutableRefObject<Record<string, HTMLButtonElement | null>>
  isAllSelected?: boolean
  isShowSelection?: boolean
  // Добавляем опциональный callback для уведомления о готовности ширины
  onColumnWidthsReady?: (widths: number[]) => void
  onFilterIconClick?: (columnName: keyof T | string) => void
  onSelectAll?: (checked: boolean) => void
  setKeySort?: (key: Column<T>) => void
  sortByNumberColumns?: NumberColumns
  verticalBorders?: boolean
}

const TableHeaderComponent = <T extends RowType>(props: Props<T>, ref: ForwardedRef<HTMLTableSectionElement>) => {
  const {
    activeFilterColumns,
    className,
    columnFilters,
    columns,
    currentKey,
    currentKeys,
    filterButtonRefs,
    isAllSelected,
    isShowSelection,
    onColumnWidthsReady,
    onFilterIconClick,
    onSelectAll,
    setKeySort,
    sortByNumberColumns,
    verticalBorders,
    ...rest
  } = props

  const localRef = useRef<HTMLTableSectionElement>(null)
  const lastWidthsRef = useRef<number[]>([])

  // Функция для измерения ширины колонок
  const measureColumnWidths = () => {
    if (!localRef.current || !columns?.length) {
      return
    }

    const thElements = localRef.current.querySelectorAll("th")
    const widths: number[] = []

    thElements.forEach((th) => {
      const rect = th.getBoundingClientRect()
      const width = rect.width

      // Для более точного измерения можно вычесть padding
      const computedStyle = window.getComputedStyle(th)
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0

      // Реальная ширина контента
      const contentWidth = width - paddingLeft - paddingRight

      // Сохраняем минимальную ширину 50px для предотвращения сжатия
      widths.push(Math.max(contentWidth, 50))
    })

    // Проверяем, изменились ли ширины
    if (widths.length > 0 && JSON.stringify(widths) !== JSON.stringify(lastWidthsRef.current)) {
      lastWidthsRef.current = widths

      // Уведомляем родительский компонент о новых ширинах
      if (onColumnWidthsReady) {
        onColumnWidthsReady(widths)
      }
    }
  }

  // Эффект для измерения ширины при изменении колонок или видимости выбора
  useEffect(() => {
    if (!columns?.length) {
      return
    }

    // Используем requestAnimationFrame для гарантированного измерения после рендера
    const timer = setTimeout(() => {
      measureColumnWidths()
    }, 100)

    return () => clearTimeout(timer)
  }, [columns, isShowSelection, sortByNumberColumns])

  // Обработчик изменения размеров окна
  useEffect(() => {
    const handleResize = () => {
      measureColumnWidths()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Комбинируем refs
  const setRefs = (element: HTMLTableSectionElement | null) => {
    localRef.current = element

    // Передаем ref наружу
    if (typeof ref === "function") {
      ref(element)
    } else if (ref) {
      ref.current = element
    }
  }

  return (
    <thead className={cn("table-head", className)} ref={setRefs} {...rest}>
      <tr>
        {isShowSelection && onSelectAll && (
          <th
            className={cn("table-head__selection-cell table-head_background", verticalBorders && "table-head__vertical-border")}
            data-column-type="selection"
          >
            <div className="table-head__wrap-cell">
              <Checkbox
                className="table-sort-checkbox"
                id="select-all-checkbox"
                isChecked={isAllSelected}
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
                  data-column-name={String(column.name)}
                  filterButtonRef={(el) => filterButtonRefs && (filterButtonRefs.current[String(column.name)] = el)}
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
                data-column-name={String(column.name)}
                data-column-type="no-sort"
                key={String(column.name) || index}
              >
                <div className={cn("table-head__wrap-cell", `table-head__content-${align || "left"}`)}>{column.title}</div>
              </th>
            )
          })}
      </tr>
    </thead>
  )
}

export const TableHeader = forwardRef(TableHeaderComponent) as <T extends RowType>(
  props: { ref?: React.ForwardedRef<HTMLTableSectionElement> } & Props<T>
) => React.ReactElement
