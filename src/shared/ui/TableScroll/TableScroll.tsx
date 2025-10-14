import React, { useEffect, useRef, useState } from "react"

import { Account } from "@/entities/Accounts"

import { Column } from "../TableSort/types"

import "./styles.scss"

interface ScrollableTableProps {
  columns: Column<Account>[]
  data: Account[]
  fixedColumns?: number
  height?: string
  onSort?: (column: Column<Account>) => void
}

const ScrollableTable: React.FC<ScrollableTableProps> = ({ columns = [], data = [], fixedColumns = 2, height = "500px", onSort }) => {
  const [sortConfig, setSortConfig] = useState<{ direction: "desc" | "asc"; key: keyof Account | null }>({
    direction: "asc",
    key: null,
  })

  const tableBodyRef = useRef<HTMLDivElement>(null)
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const fixedColumnsRef = useRef<HTMLDivElement>(null)

  // Синхронизация горизонтальной прокрутки
  useEffect(() => {
    const handleBodyScroll = () => {
      if (tableBodyRef.current && tableHeaderRef.current) {
        tableHeaderRef.current.scrollLeft = tableBodyRef.current.scrollLeft
      }
    }

    const body = tableBodyRef.current
    if (body) {
      body.addEventListener("scroll", handleBodyScroll)
      return () => body.removeEventListener("scroll", handleBodyScroll)
    }
  }, [])

  // Синхронизация вертикальной прокрутки фиксированных колонок
  useEffect(() => {
    const handleBodyVerticalScroll = () => {
      if (tableBodyRef.current && fixedColumnsRef.current) {
        fixedColumnsRef.current.scrollTop = tableBodyRef.current.scrollTop
      }
    }

    const body = tableBodyRef.current
    if (body) {
      body.addEventListener("scroll", handleBodyVerticalScroll)
      return () => body.removeEventListener("scroll", handleBodyVerticalScroll)
    }
  }, [])

  // Обработчик сортировки
  const handleSort = (column: Column<Account>) => {
    if (!column.isSortable) {
      return
    }

    let direction: "desc" | "asc" = "asc"
    if (sortConfig.key === column.name && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ direction, key: column.name })

    if (onSort) {
      onSort(column)
    }
  }

  // Сортируем данные если нужно
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) {
      return data
    }

    return [...data].sort((a, b) => {
      const sorter = columns.find((col) => col.name === sortConfig.key)?.sorter

      if (sorter) {
        return sortConfig.direction === "asc" ? sorter(a, b) : sorter(b, a)
      }

      // Стандартная сортировка для строк и чисел
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig, columns])

  // Ширины колонок по умолчанию
  const getColumnWidth = (column: Column<Account>): number => {
    // if (column?.width) {
    //   return column?.width
    // }

    const widthMap: { [key in keyof Account]?: number } = {
      account: 120,
      address: 200,
      city: 120,
      debt: 100,
      fio: 180,
      id: 80,
      penalty: 100,
    }

    return widthMap[column.name] || 150
  }

  // Разделение колонок на фиксированные и прокручиваемые
  const fixedCols = columns.slice(0, fixedColumns)
  const scrollableCols = columns.slice(fixedColumns)

  // Вычисляем общую ширину фиксированных колонок
  const fixedColumnsWidth = fixedCols.reduce((sum, col) => sum + getColumnWidth(col), 0)

  return (
    <div className="scrollable-table-container" style={{ height }}>
      <div className="table-wrapper">
        {/* Фиксированные колонки */}
        <div className="fixed-columns" style={{ width: fixedColumnsWidth }}>
          <div className="fixed-header">
            <table>
              <thead>
                <tr>
                  {fixedCols.map((column) => (
                    <th
                      className={column.isSortable ? "sortable" : ""}
                      key={String(column.name)}
                      onClick={() => handleSort(column)}
                      style={{ width: getColumnWidth(column) }}
                    >
                      <div className="th-content">
                        {column.title}
                        {column.isSortable && (
                          <span className="sort-indicator">
                            {sortConfig.key === column.name && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="fixed-body" ref={fixedColumnsRef} style={{ height: `calc(${height} - 45px)` }}>
            <table>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr key={row.id || index}>
                    {fixedCols.map((column) => (
                      <td key={String(column.name)} style={{ width: getColumnWidth(column) }}>
                        {row[column.name]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Прокручиваемая часть таблицы */}
        <div className="scrollable-section">
          <div className="table-header" ref={tableHeaderRef}>
            <table style={{ marginLeft: fixedColumnsWidth }}>
              <thead>
                <tr>
                  {scrollableCols.map((column) => (
                    <th
                      className={column.isSortable ? "sortable" : ""}
                      key={String(column.name)}
                      onClick={() => handleSort(column)}
                      style={{ width: getColumnWidth(column) }}
                    >
                      <div className="th-content">
                        {column.title}
                        {column.isSortable && (
                          <span className="sort-indicator">
                            {sortConfig.key === column.name && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body" ref={tableBodyRef} style={{ height: `calc(${height} - 45px)` }}>
            <table style={{ marginLeft: fixedColumnsWidth }}>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr key={row.id || index}>
                    {scrollableCols.map((column) => (
                      <td key={String(column.name)} style={{ width: getColumnWidth(column) }}>
                        {row[column.name]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollableTable
