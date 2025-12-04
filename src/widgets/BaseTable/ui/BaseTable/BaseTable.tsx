import React, { useMemo, useRef, useState } from "react"

import cn from "classnames"
import { Typography } from "itpc-ui-kit"

import { RowDensity } from "@/shared/constants"
import { useTableFilters } from "@/shared/lib/hooks/useTableFilters/useTableFilters"
import { Column, ColumnConfig, NumberColumns, RowType } from "@/shared/lib/types/table"
import { FontSize, PageSize } from "@/shared/lib/types/types"
import { FiltersColumn } from "@/shared/ui/FiltersColumn"
import { Flex } from "@/shared/ui/layout/Flex"
import { MenuVisibilityColumns } from "@/shared/ui/MenuVisibilityColumns"
import { PageSizeSelector } from "@/shared/ui/PageSizeSelector/"
import { Pagination } from "@/shared/ui/Pagination"
import { Table } from "@/shared/ui/Table"
import { TableSettingsMenu } from "@/shared/ui/TableSettingsMenu"
import { TagPanelActiveFilters } from "@/shared/ui/TagPanelActiveFilters"

import "./styles.scss"

interface Props<T extends RowType, C extends string, V extends string = string> {
  activeCellKey?: string
  changeVisibleColumns: (columns: Set<C | V>) => void
  className?: string
  config: ColumnConfig<T, C, V>
  currentPage: number
  data: T[]
  isFetching?: boolean
  isOpenExpandedInfoCell?: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onRowSelect: (id: string | number, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  selectedColumns: Set<C | V>
  selectedRow: Set<string | number>
  step: PageSize
  total: number
  visibleColumns: (C | V)[]
}

export const BaseTable = <T extends RowType, C extends string, V extends string = string>({
  activeCellKey,
  changeVisibleColumns,
  className,
  config,
  currentPage,
  data,
  isFetching = false,
  isOpenExpandedInfoCell = false,
  onPageChange,
  onPageSizeChange,
  onRowSelect,
  onSelectAll,
  selectedColumns,
  selectedRow,
  step,
  total,
  visibleColumns,
}: Props<T, C, V>) => {
  const { columnLabels, columns: dataColumns, displayOrder: allColumns, requiredColumns, virtualColumns } = config
  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const {
    activeFilterColumn,
    closeFilter,
    columnFilters,
    handleFilterChange,
    handleFilterIconClick,
    handleRemoveFilter,
    handleResetAllFilters,
  } = useTableFilters<T>()

  const [rowDensity, setRowDensity] = useState<RowDensity>(RowDensity.MEDIUM)
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [striped, setStriped] = useState(false)
  const [verticalBorders, setVerticalBorders] = useState(false)

  const toggleStriped = () => setStriped((prev) => !prev)
  const toggleVerticalBorders = () => setVerticalBorders((prev) => !prev)

  const visibleColumnObjects = useMemo(
    () =>
      visibleColumns
        .map((key) => {
          if (key in virtualColumns) {
            return virtualColumns[key as keyof typeof virtualColumns]
          }
          if (key in dataColumns) {
            return dataColumns[key as keyof typeof dataColumns]
          }
          return null
        })
        .filter(Boolean) as Column<T>[],
    [visibleColumns, dataColumns, virtualColumns]
  )

  const filteredData = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) {
      return data
    }

    return data.filter((row, index) =>
      Object.entries(columnFilters).every(([columnKey, filterValue]) => {
        const col = visibleColumnObjects.find((c) => c.name === columnKey)
        if (!col || !filterValue.trim()) {
          return true
        }

        let rowValue: string

        if (col.type === "data") {
          rowValue = String(row[col.name as keyof T] ?? "")
        } else if (col.type === "virtual" && col.getFilterValue) {
          rowValue = String(col.getFilterValue(row, index) ?? "")
        } else {
          return true // не фильтруем
        }

        return rowValue.toLowerCase().includes(filterValue.toLowerCase())
      })
    )
  }, [data, columnFilters, visibleColumnObjects])

  const displayRows = useMemo(() => {
    if (isFetching) {
      // Создаём заглушки: количество = step
      return Array.from({ length: step }, (_, i) => ({ id: `skeleton-${i}` }) as T)
    }
    return filteredData
  }, [isFetching, filteredData, step])

  return (
    <Flex style={{ width: "100%" }} vertical>
      <Flex className="base-table__controls" gap={8} justify="space-between">
        <Flex align="center" gap={8}>
          <Typography.Text>Всего записей: {isFetching ? "Загрузка..." : total}</Typography.Text>
          <TagPanelActiveFilters
            columnLabels={columnLabels}
            filters={columnFilters}
            onRemoveFilter={handleRemoveFilter}
            onResetAll={handleResetAllFilters}
            visibleColumns={visibleColumns as string[]}
          />
        </Flex>

        <Flex gap={8}>
          <Pagination
            callback={(result) => onPageChange(result.currentPage - 1)}
            className="base-table__pagination"
            currentPage={currentPage + 1}
            dataLength={total}
            step={step}
          />
          <PageSizeSelector className="base-table__page-size-selector" onChange={onPageSizeChange} value={step} />
          <MenuVisibilityColumns
            allColumns={allColumns.filter((col) => !requiredColumns.has(col))}
            getColumnLabel={(col) => columnLabels[col]}
            onChange={changeVisibleColumns}
            selected={selectedColumns}
          />
          <TableSettingsMenu
            currentDensity={rowDensity}
            currentFontSize={fontSize}
            onChangeDensity={setRowDensity}
            onChangeFontSize={setFontSize}
            onToggleStriped={toggleStriped}
            onToggleVerticalBorders={toggleVerticalBorders}
            striped={striped}
            verticalBorders={verticalBorders}
          />
        </Flex>
      </Flex>

      <Flex className={cn("base-table", className)}>
        <Table<T>
          activeCellKey={activeCellKey}
          activeFilterColumns={activeFilterColumn}
          className="base-table__component"
          columnFilters={columnFilters}
          columns={visibleColumnObjects}
          filterButtonRefs={filterButtonRefs}
          fontSize={fontSize}
          isLoading={isFetching}
          isOpenExpandedInfoCell={isOpenExpandedInfoCell}
          onFilterIconClick={handleFilterIconClick}
          onRowSelect={onRowSelect}
          onSelectAll={onSelectAll}
          rowDensity={rowDensity}
          rows={displayRows}
          selectedRow={selectedRow}
          sortByNumberColumns={NumberColumns.TWO}
          striped={striped}
          verticalBorders={verticalBorders}
          isShowSelection
        />
      </Flex>

      {activeFilterColumn && (
        <FiltersColumn<T>
          anchorRef={{ current: filterButtonRefs.current[String(activeFilterColumn)] }}
          columnName={activeFilterColumn}
          currentValue={columnFilters[activeFilterColumn] || ""}
          key={String(activeFilterColumn)}
          onClose={closeFilter}
          onFilterChange={handleFilterChange}
          isOpen
        />
      )}
    </Flex>
  )
}
