import React, { useEffect } from "react"

import { Account, getAccounts } from "@/entities/Account"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { BaseTable } from "@/widgets/BaseTable"

import { SELECTION_COLUMNS_CONFIG } from "../../lib/config/selectionTableConfig"
import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../../lib/constants"

export const SelectionTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts, isLoading } = useAppSelector((state) => state.accounts)
  const { defaultVisible, displayOrder, requiredColumns } = SELECTION_COLUMNS_CONFIG
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
  })

  const handleFetch = () => dispatch(getAccounts())

  const handleBulkDelete = (ids: (string | number)[]) => {
    // dispatch(deleteAccounts(ids));
    console.log("Удалить аккаунты:", ids)
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <BaseTable<Account, BaseColumnTableSelect, VirtualColumnTableSelect>
      changeVisibleColumns={handleChangeVisibleColumns}
      config={SELECTION_COLUMNS_CONFIG}
      data={accounts}
      getRowId={(row: { id: string | number }) => row.id}
      isFetching={isLoading}
      onBulkDelete={handleBulkDelete}
      selectedColumns={selectedColumns}
      visibleColumns={visibleColumns}
    />
  )
}
