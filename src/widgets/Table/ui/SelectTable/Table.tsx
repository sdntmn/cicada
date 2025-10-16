import React, { useEffect, useState } from "react"

import { NumberColumns } from "itpc-ui-kit"

import { Account } from "@/entities/Accounts"
import { getAccounts } from "@/entities/Accounts/model/thunk/thunk"
import { RowDensity } from "@/shared/constants"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { TableSort } from "@/shared/ui/TableSort"
import { Column } from "@/shared/ui/TableSort/types"

import { DEFAULT_VISIBLE, REQUIRED_COLUMNS, SELECTION_TABLE_DISPLAY_ORDER } from "../../lib/constants/columns"
import { buildVisibleColumns } from "../../lib/helpers/buildVisibleColumns/buildVisibleColumns"
import { ColumnTableSelect } from "../../lib/types/table"
import { MenuVisibilityColumns } from "../MenuVisibilityColumns/MenuVisibilityColumns"

import "./styles.scss"

export const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.accounts)

  const [selectedColumns, setSelectedColumns] = useState<Set<ColumnTableSelect>>(new Set(DEFAULT_VISIBLE))

  const { handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(accounts)

  const visibleColumns: Column<Account>[] = buildVisibleColumns(selectedColumns)

  const handleChangeVisibleColumns = (newSelectedColumns: Set<ColumnTableSelect>) => {
    const finalSet = new Set(newSelectedColumns)

    REQUIRED_COLUMNS.forEach((col) => finalSet.add(col))

    setSelectedColumns(finalSet)
  }

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  return (
    <Flex vertical>
      <Flex>
        <MenuVisibilityColumns
          allColumns={SELECTION_TABLE_DISPLAY_ORDER.filter((col) => !REQUIRED_COLUMNS.has(col))}
          onChange={handleChangeVisibleColumns}
          selected={selectedColumns}
        />
      </Flex>

      <Flex className="table">
        <TableSort<Account>
          className="table__sort"
          columns={visibleColumns}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          rowDensity={RowDensity.MEDIUM}
          rows={accounts}
          selectedRow={selectedRow}
          sortByNumberColumns={NumberColumns.TWO}
          isShowSelection
        />
      </Flex>
    </Flex>
  )
}
