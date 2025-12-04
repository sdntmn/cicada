import React, { useEffect } from "react"

import { Debtor, debtorsActions } from "@/entities/Debtor"
import { searchDebtorCandidates } from "@/entities/Debtor/model/thunk/thunk"
import { сhangeDebtStageToNew } from "@/features/ChangeDebtStage/model/thunk/thunk"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { PageSize } from "@/shared/lib/types/types"
import { BulkActionsPanel } from "@/shared/ui/BulkActionsPanel"
import { BaseTable } from "@/widgets/BaseTable"

import { SELECTION_COLUMNS_CONFIG } from "../../lib/config/selectionTableConfig"
import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../../lib/constants"

import "./styles.scss"

export const SelectionTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, searchParams, total } = useAppSelector((state) => state.debtors)
  const { isLoading: isLoadingStage } = useAppSelector((state) => state.changeStage)
  const { defaultVisible, displayOrder, requiredColumns } = SELECTION_COLUMNS_CONFIG
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
  })

  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(debtors)

  const handleBulkDelete = (ids: (string | number)[]) => {
    // dispatch(deleteAccounts(ids));
    console.log("Удалить аккаунты:", ids)
  }

  const handlePageChange = (newPage: number) => {
    dispatch(debtorsActions.setPage(newPage))
    dispatch(searchDebtorCandidates({ ...searchParams, page: newPage, pageSize }))
  }

  const handlePageSizeChange = (newSize: PageSize) => {
    dispatch(debtorsActions.setPageSize(newSize))
    dispatch(searchDebtorCandidates({ ...searchParams, page: 0, pageSize: newSize }))
  }

  const handleMoveToNew = () => {
    const accountIds = Array.from(selectedRow).filter((id) => typeof id === "string") as string[]
    dispatch(сhangeDebtStageToNew(accountIds))
    dispatch(searchDebtorCandidates({ ...searchParams, page, pageSize }))
    clearSelection()
  }

  useEffect(() => {
    dispatch(debtorsActions.clearDebtorsState())
    dispatch(debtorsActions.clearSearchedAccounts())
  }, [dispatch])

  return (
    <>
      <BaseTable<Debtor, BaseColumnTableSelect, VirtualColumnTableSelect>
        changeVisibleColumns={handleChangeVisibleColumns}
        className="selection-table"
        config={SELECTION_COLUMNS_CONFIG}
        currentPage={page}
        data={debtors}
        isFetching={isLoading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        selectedColumns={selectedColumns}
        selectedRow={selectedRow}
        step={pageSize}
        total={total}
        visibleColumns={visibleColumns}
      />

      <BulkActionsPanel onClearSelection={clearSelection} onMoveNext={handleMoveToNew} selectedRow={selectedRow} />
    </>
  )
}
