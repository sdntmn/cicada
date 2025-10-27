import React, { useEffect, useMemo, useState } from "react"

import { NumberColumns, Typography } from "itpc-ui-kit"

import { Account, getAccounts } from "@/entities/Account"
import { RowDensity } from "@/shared/constants"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { Pagination } from "@/shared/ui/Pagination"
import { TableSort } from "@/shared/ui/TableSort"

import { REQUIRED_COLUMNS, SELECTION_TABLE_COLUMNS, SELECTION_TABLE_DISPLAY_ORDER, VIRTUAL_COLUMN } from "../../lib/constants/columns"
import { BaseColumnTableSelect } from "../../lib/constants/enums"
import { useAccountTableColumns } from "../../lib/hooks/useAccountTableColumns/useAccountTableColumns"
import { ActiveFilters } from "../ActiveFilters/ActiveFilters"
import { BulkActionsPanel } from "../BulkActionsPanel/BulkActionsPanel"
import { FiltersColumn } from "../FiltersColumn/FiltersColumn"
import { MenuVisibilityColumns } from "../MenuVisibilityColumns/MenuVisibilityColumns"
import { PageSize, PageSizeSelector } from "../PageSizeSelector/PageSizeSelector"
import { TableSettingsMenu } from "../TableSettingsMenu/TableSettingsMenu"

import "./styles.scss"

export const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.accounts)
  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(accounts)
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useAccountTableColumns()

  const [activeFilterColumns, setActiveFilterColumns] = useState<keyof Account | null>(null)
  const [rowDensity, setRowDensity] = useState<RowDensity>(RowDensity.MEDIUM)

  const [columnFilters, setColumnFilters] = useState<Partial<Record<keyof Account, string>>>({})
  const [numbersRenderLines, setNumbersRenderLines] = useState<PageSize>(20)

  const handleRemoveFilter = (column: keyof Account) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[column]
      return newFilters
    })
  }

  const handleResetAllFilters = () => {
    setColumnFilters({})
  }

  const handleFilterChange = (column: keyof Account, value?: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev }
      if (value) {
        newFilters[column] = value
      } else {
        delete newFilters[column]
      }
      return newFilters
    })
  }

  const handleFilterIconClick = (columnName: keyof Account) => {
    setActiveFilterColumns(columnName)
  }

  const handleDeleteSelected = () => {
    const ids = Array.from(selectedRow)
    // dispatch(deleteAccounts(ids))
    console.log("Удалить:", ids)
  }

  const closeFilter = () => setActiveFilterColumns(null)

  const filteredAccounts = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) {
      return accounts
    }

    return accounts.filter((row) =>
      Object.entries(columnFilters).every(([column, filterValue]) => {
        const rowValue = String(row[column as keyof typeof row] ?? "")
        return rowValue.toLowerCase().includes(filterValue.toLowerCase())
      })
    )
  }, [accounts, columnFilters])

  const visibleColumnObjects = useMemo(
    () =>
      visibleColumns.map((colName) => {
        if (colName.type === "virtual") {
          return VIRTUAL_COLUMN
        }
        return SELECTION_TABLE_COLUMNS[colName.name as BaseColumnTableSelect]
      }),
    [visibleColumns]
  )

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  return (
    <Flex style={{ width: "100%" }} vertical>
      <Flex className="table__controls" gap={8} justify="space-between">
        <Flex align="center" gap={8}>
          <Typography.Text>Всего записей: {filteredAccounts.length}</Typography.Text>
          <ActiveFilters
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
            dataLength={filteredAccounts.length}
            step={numbersRenderLines}
          />
          <PageSizeSelector className="table__page-size-selector" onChange={setNumbersRenderLines} value={numbersRenderLines} />
          <MenuVisibilityColumns
            allColumns={SELECTION_TABLE_DISPLAY_ORDER.filter((col) => !REQUIRED_COLUMNS.has(col))}
            onChange={handleChangeVisibleColumns}
            selected={selectedColumns}
          />
          <TableSettingsMenu currentDensity={rowDensity} onChangeDensity={setRowDensity} />
        </Flex>
      </Flex>

      <Flex className="table">
        <TableSort<Account>
          activeFilterColumns={activeFilterColumns}
          className="table__sort"
          columnFilters={columnFilters}
          columns={visibleColumnObjects}
          onFilterIconClick={handleFilterIconClick}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          rowDensity={rowDensity}
          rows={filteredAccounts}
          selectedRow={selectedRow}
          sortByNumberColumns={NumberColumns.TWO}
          isShowSelection
        />
      </Flex>
      {selectedRow.size > 0 && (
        <BulkActionsPanel
          onClearSelection={clearSelection}
          onDelete={handleDeleteSelected}
          selectedCount={selectedRow.size}
          // onExport={() => console.log("Экспорт")}
        />
      )}
      {activeFilterColumns && (
        <FiltersColumn
          buttonId={`filter-btn-${String(activeFilterColumns)}`}
          columnName={activeFilterColumns}
          currentValue={columnFilters[activeFilterColumns] || ""}
          isOpen={activeFilterColumns !== null}
          key={activeFilterColumns}
          onClose={closeFilter}
          onFilterChange={handleFilterChange}
        />
      )}
    </Flex>
  )
}
