import React from "react"

import { Account, accountsActions } from "@/entities/Account"
import { searchAccounts } from "@/entities/Account/model/thunk/thunk"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { PageSize } from "@/shared/lib/types/types"
import { BaseTable } from "@/widgets/BaseTable"

import { SELECTION_COLUMNS_CONFIG } from "../../lib/config/selectionTableConfig"
import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../../lib/constants"

export const SelectionTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts, isLoading, page, pageSize, searchParams, total } = useAppSelector((state) => state.accounts)
  const { defaultVisible, displayOrder, requiredColumns } = SELECTION_COLUMNS_CONFIG
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
  })

  const handleBulkDelete = (ids: (string | number)[]) => {
    // dispatch(deleteAccounts(ids));
    console.log("Удалить аккаунты:", ids)
  }

  const handlePageChange = (newPage: number) => {
    dispatch(accountsActions.setPage(newPage))
    dispatch(searchAccounts({ ...searchParams, page: newPage, pageSize }))
  }

  const handlePageSizeChange = (newSize: PageSize) => {
    dispatch(accountsActions.setPageSize(newSize))
    dispatch(searchAccounts({ ...searchParams, page: 0, pageSize: newSize }))
  }

  return (
    <BaseTable<Account, BaseColumnTableSelect, VirtualColumnTableSelect>
      changeVisibleColumns={handleChangeVisibleColumns}
      config={SELECTION_COLUMNS_CONFIG}
      currentPage={page}
      data={accounts}
      getRowId={(row: { id: string | number }) => row.id}
      isFetching={isLoading}
      onBulkDelete={handleBulkDelete}
      onPageChange={handlePageChange} // ← добавлено
      onPageSizeChange={handlePageSizeChange} // ← добавлено
      selectedColumns={selectedColumns}
      step={pageSize}
      total={total} // ← добавлено
      visibleColumns={visibleColumns}
    />
  )
}
