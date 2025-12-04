import React, { useEffect, useState } from "react"

import { debtorsActions } from "@/entities/Debtor"
import { getDebtorsNew } from "@/entities/Debtor/model/thunk/thunk"
import { useTableRowSelection } from "@/shared/lib/hooks"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { VirtualColumn } from "@/shared/lib/types/table"
import { PageSize } from "@/shared/lib/types/types"
import { BulkActionsPanel } from "@/shared/ui/BulkActionsPanel"
import { BaseTable } from "@/widgets/BaseTable"

import { INITIAL_DATA_TABLE_CONFIG } from "../../lib/config/initialDataTableConfig"
import { BaseColumn, VirtualColumnInitialDataTable } from "../../lib/constants"
import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

export const InitialDataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, total } = useAppSelector((state) => state.debtors)
  const { defaultVisible, displayOrder, requiredColumns } = INITIAL_DATA_TABLE_CONFIG
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
  })

  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(debtors)

  const [selectedDebtor, setSelectedDebtor] = useState<InitialData | null>(null)
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false)

  const handleView = (debtor: InitialData) => {
    setSelectedDebtor(debtor)
    setIsCardOpen(true)
  }

  const handleCloseCard = () => {
    setIsCardOpen(false)
    setSelectedDebtor(null)
  }

  // Передайте handleView в ActionCell через замыкание
  const renderActionCell = (rowData: InitialData) => (
    <ActionCell
      onView={handleView}
      rowData={rowData}
      // можно также передать onSendClaim и т.д.
    />
  )

  const ACTION_COLUMN: VirtualColumn<InitialData> = {
    align: "center",
    name: VirtualColumnInitialDataTable.ACTION,
    render: renderActionCell,
    title: "Действие",
    type: "virtual",
  }

  const handleDeleteSelected = () => {
    const ids = Array.from(selectedRow) // ← из пропсов
    console.info(ids)
  }

  const handlePageChange = (newPage: number) => {
    dispatch(debtorsActions.setPage(newPage))
    dispatch(getDebtorsNew({ page: newPage, pageSize }))
  }

  const handlePageSizeChange = (newSize: PageSize) => {
    dispatch(debtorsActions.setPageSize(newSize))
    dispatch(getDebtorsNew({ page: 0, pageSize: newSize }))
  }

  useEffect(() => {
    dispatch(getDebtorsNew({ page: 0, pageSize: 20 }))
    dispatch(debtorsActions.clearSearchedAccounts())
    dispatch(debtorsActions.clearDebtorsState())
  }, [dispatch])

  console.info(isCardOpen)

  return (
    <>
      <div className="initial-table-container">
        <BaseTable<InitialData, BaseColumn, VirtualColumnInitialDataTable>
          config={{
            ...INITIAL_DATA_TABLE_CONFIG,
            virtualColumns: {
              ...INITIAL_DATA_TABLE_CONFIG.virtualColumns,
              [VirtualColumnInitialDataTable.ACTION]: ACTION_COLUMN,
            },
          }}
          changeVisibleColumns={handleChangeVisibleColumns}
          className="initial-table-container__table"
          currentPage={page}
          data={debtors as InitialData[]}
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
        {isCardOpen && <DebtorCard debtor={selectedDebtor} isOpen={isCardOpen} onClose={handleCloseCard} />}
      </div>

      <BulkActionsPanel onClearSelection={clearSelection} onDelete={handleDeleteSelected} selectedRow={selectedRow} />
    </>
  )
}
