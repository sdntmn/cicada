import React, { useMemo, useRef, useState } from "react"

import { Typography } from "itpc-ui-kit"

import { FontSize, RowDensity } from "@/shared/constants"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useTableFilters } from "@/shared/lib/hooks/useTableFilters/useTableFilters"
import { Column, ColumnConfig, NumberColumns, RowType } from "@/shared/lib/types/table"
import { PageSize } from "@/shared/lib/types/types"
import { Flex } from "@/shared/ui/layout/Flex"
import { Pagination } from "@/shared/ui/Pagination"
import { Table } from "@/shared/ui/Table"

import { BulkActionsPanel } from "../BulkActionsPanel/BulkActionsPanel"
import { FiltersColumn } from "../FiltersColumn/FiltersColumn"
import { MenuVisibilityColumns } from "../MenuVisibilityColumns/MenuVisibilityColumns"
import { PageSizeSelector } from "../PageSizeSelector/PageSizeSelector"
import { TableSettingsMenu } from "../TableSettingsMenu/TableSettingsMenu"
import { TagPanelActiveFilters } from "../TagPanelActiveFilters/TagPanelActiveFilters"

import "./styles.scss"

interface Props<T extends RowType, C extends string, V extends string = string> {
  changeVisibleColumns: (columns: Set<C | V>) => void
  config: ColumnConfig<T, C, V>
  // Данные
  data: T[]
  getRowId: (row: T) => string | number
  isFetching?: boolean
  onBulkDelete?: (ids: (string | number)[]) => void
  onBulkExport?: () => void
  selectedColumns: Set<C | V>
  visibleColumns: (C | V)[]
}

export const BaseTable = <T extends RowType, C extends string, V extends string = string>({
  changeVisibleColumns,
  config,
  data,
  getRowId,
  isFetching = false,
  onBulkDelete,
  onBulkExport,
  selectedColumns,
  visibleColumns,
}: Props<T, C, V>) => {
  const { columnLabels, columns: dataColumns, displayOrder: allColumns, requiredColumns, virtualColumns } = config
  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(data, getRowId)
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
  const [numbersRenderLines, setNumbersRenderLines] = useState<PageSize>(20)
  const [striped, setStriped] = useState(true)
  const [verticalBorders, setVerticalBorders] = useState(false)

  const toggleStriped = () => setStriped((prev) => !prev)
  const toggleVerticalBorders = () => setVerticalBorders((prev) => !prev)

  const handleDeleteSelected = () => {
    if (onBulkDelete) {
      const ids = Array.from(selectedRow)
      onBulkDelete(ids)
    }
  }

  const filteredData = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) {
      return data
    }
    return data.filter((row) =>
      Object.entries(columnFilters).every(([column, filterValue]) => {
        const rowValue = String(row[column as keyof T] ?? "")
        return rowValue.toLowerCase().includes(filterValue.toLowerCase())
      })
    )
  }, [data, columnFilters])

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
          console.warn(`Unknown column key: ${key}`)
          return null
        })
        .filter(Boolean) as Column<T>[],
    [visibleColumns, dataColumns, virtualColumns]
  )

  return (
    <>
      <Flex style={{ width: "100%" }} vertical>
        <Flex className="table__controls" gap={8} justify="space-between">
          <Flex align="center" gap={8}>
            <Typography.Text>Всего записей: {isFetching ? "Загрузка..." : filteredData.length}</Typography.Text>
            <TagPanelActiveFilters
              columnLabels={columnLabels}
              filters={columnFilters}
              onRemoveFilter={handleRemoveFilter}
              onResetAll={handleResetAllFilters}
              visibleColumns={visibleColumns}
            />
          </Flex>

          <Flex gap={8}>
            <Pagination
              callback={() => console.info("Пагинация")}
              className="table__pagination"
              dataLength={filteredData.length}
              step={numbersRenderLines}
            />
            <PageSizeSelector className="table__page-size-selector" onChange={setNumbersRenderLines} value={numbersRenderLines} />
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

        <Flex className="table">
          <Table<T>
            activeFilterColumns={activeFilterColumn}
            className="table__sort"
            columnFilters={columnFilters}
            columns={visibleColumnObjects}
            filterButtonRefs={filterButtonRefs}
            fontSize={fontSize}
            getRowId={getRowId}
            onFilterIconClick={handleFilterIconClick}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            rowDensity={rowDensity}
            rows={filteredData}
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

      {selectedRow.size > 0 && (
        <BulkActionsPanel
          onClearSelection={clearSelection}
          onDelete={onBulkDelete ? handleDeleteSelected : undefined}
          onExport={onBulkExport}
          selectedCount={selectedRow.size}
        />
      )}
    </>
  )
}
