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

import { CLAIM_TABLE_CONFIG } from "../../lib/config/claimTableConfig"
import { BaseColumn } from "../../lib/constants"
import { VirtualColumnInitialDataTableKey } from "../../lib/constants/columnKeysInitialData"
import { InitialData } from "../../lib/types/initialDataTypes"
import { ActionEditCell } from "../ActionEditCell/ActionCell"
import { CardPersonData } from "../CardPersonData/CardPersonData"
import { CellActions } from "../CellActions/CellActions"
import { EditDataModal } from "../ModalData/ModalData"

import "./styles.scss"

export const ClaimTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, total } = useAppSelector((state) => state.debtors)
  const { defaultVisible, displayOrder, requiredColumns } = CLAIM_TABLE_CONFIG
  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
  })

  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(debtors)

  const [selectedDebtor, setSelectedDebtor] = useState<InitialData | null>(null)
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false)
  const [isOpenEditPersonData, setIsOpenEditPersonData] = useState<boolean>(false)

  const handleView = (debtor: InitialData) => {
    setSelectedDebtor(debtor)
    setIsCardOpen(true)
  }

  const handleCloseCard = () => {
    setIsCardOpen(false)
    setSelectedDebtor(null)
  }

  const handleOpenEdit = (debtor: InitialData) => {
    setIsOpenEditPersonData(true)
  }

  const handelCloseEdit = () => {
    setIsOpenEditPersonData(false)
    // dispatch(getDebtorsNew({ page: 0, pageSize: 20 }))
    // dispatch(debtorsActions.clearSearchedAccounts())
  }

  // Передайте handleView в ActionCell через замыкание
  const renderActionCell = (rowData: InitialData) => (
    <CellActions
      onEdit={handleOpenEdit} // можно также передать onSendClaim и т.д.
      rowData={rowData}
    />
  )

  const ACTION_COLUMN: VirtualColumn<InitialData> = {
    align: "center",
    name: VirtualColumnInitialDataTable.ACTION,
    render: renderActionCell,
    title: "Действие",
    type: "virtual",
  }

  // Передайте handleView в ActionCell через замыкание
  const renderEditActionCell = (rowData: InitialData) => (
    <ActionEditCell
      onEdit={handleOpenEdit}
      rowData={rowData}
      // можно также передать onSendClaim и т.д.
    />
  )

  const DEBTOR: VirtualColumn<InitialData> = {
    align: "center",
    name: VirtualColumnInitialDataTable.DEBTOR,
    render: renderEditActionCell,
    title: "Персональные данные",
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
        {/* <BaseTable<InitialData, BaseColumn, VirtualColumnInitialDataTableKey>
          config={{
            ...CLAIM_TABLE_CONFIG,
            virtualColumns: {
              ...CLAIM_TABLE_CONFIG.virtualColumns,
              [VirtualColumnInitialDataTableKey.ACTION]: ACTION_COLUMN,
              [VirtualColumnInitialDataTableKey.DEBTOR]: DEBTOR,
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
        /> */}
        {isCardOpen && <CardPersonData debtor={selectedDebtor} isOpen={isCardOpen} onClose={handleCloseCard} />}
        {isOpenEditPersonData && <EditDataModal isOpen={isOpenEditPersonData} onClose={handelCloseEdit} />}
      </div>

      <BulkActionsPanel onClearSelection={clearSelection} onDelete={handleDeleteSelected} selectedRow={selectedRow} />
    </>
  )
}
