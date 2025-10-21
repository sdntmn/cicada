import React, { useEffect, useState } from "react"

import { NumberColumns } from "itpc-ui-kit"

import { Account } from "@/entities/Accounts"
import { getAccounts } from "@/entities/Accounts/model/thunk/thunk"
import { RowDensity } from "@/shared/constants"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { TableSort } from "@/shared/ui/TableSort"

import { REQUIRED_COLUMNS, SELECTION_TABLE_DISPLAY_ORDER } from "../../lib/constants/columns"
import { useAccountTableColumns } from "../../lib/hooks/useAccountTableColumns/useAccountTableColumns"
import { FiltersColumn } from "../FiltersColumn/FiltersColumn"
import { MenuVisibilityColumns } from "../MenuVisibilityColumns/MenuVisibilityColumns"
import { TableSettingsMenu } from "../TableSettingsMenu/TableSettingsMenu"

import "./styles.scss"

export const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.accounts)
  const { handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(accounts)
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useAccountTableColumns()
  const [activeFilterColumns, setActiveFilterColumns] = useState<keyof Account | null>(null)
  const [rowDensity, setRowDensity] = useState<RowDensity>(RowDensity.MEDIUM)

  const [filterAnchor, setFilterAnchor] = useState<{
    column: keyof Account
    element: HTMLElement | null
  } | null>(null)

  const handleFilterIconClick = (columnName: keyof Account) => {
    setActiveFilterColumns(columnName)
  }

  const closeFilter = () => setActiveFilterColumns(null)

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = () => setFilterAnchor(null)
    if (filterAnchor) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [filterAnchor])

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  console.info(rowDensity)

  return (
    <Flex vertical>
      <Flex className="table__controls" gap={8} justify="end">
        <MenuVisibilityColumns
          allColumns={SELECTION_TABLE_DISPLAY_ORDER.filter((col) => !REQUIRED_COLUMNS.has(col))}
          onChange={handleChangeVisibleColumns}
          selected={selectedColumns}
        />
        <TableSettingsMenu currentDensity={rowDensity} onChangeDensity={setRowDensity} />
      </Flex>

      <Flex className="table">
        <TableSort<Account>
          activeFilterColumns={activeFilterColumns}
          className="table__sort"
          columns={visibleColumns}
          // isActiveFilter={activeFilterColumns}
          onFilterIconClick={handleFilterIconClick}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          rowDensity={rowDensity}
          rows={accounts}
          selectedRow={selectedRow}
          sortByNumberColumns={NumberColumns.TWO}
          isShowSelection
        />
      </Flex>
      {activeFilterColumns && (
        <FiltersColumn
          buttonId={`filter-btn-${String(activeFilterColumns)}`}
          columnName={activeFilterColumns}
          // filters={undefined}
          isOpen={activeFilterColumns !== null}
          key={activeFilterColumns}
          onClose={closeFilter}
          onFilterChange={() => {}}
        />
      )}
    </Flex>
  )
}
