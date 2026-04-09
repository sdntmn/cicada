import React, { useEffect } from "react"

import { debtorsActions } from "@/entities/Debtor"
import { getDebtorsNew } from "@/entities/Debtor/model/thunk/thunk"
import { DetailType, Menu } from "@/shared/constants"
import { useTablePagination, useTableRowSelection } from "@/shared/lib/hooks"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import type { AnySubSection, NavigationTarget } from "@/shared/lib/types/navigation"
import { BulkActionsPanel } from "@/shared/ui/BulkActionsPanel"
import { CellPopup } from "@/shared/ui/CellPopup/ui/CellPopup"
import { Panel } from "@/shared/ui/Panel/Panel"
import { BaseTable } from "@/widgets/BaseTable"

import { SETTLEMENT_TABLE_CONFIG } from "../../lib/config/config"
import { BaseColumnSettlement, VirtualColumnSettlementKey } from "../../lib/constants/keysColumns"
import { useCellInteractions } from "../../lib/hooks/useCellInteractions/useCellInteractions"
import { useEditModal } from "../../lib/hooks/useEditModal/useEditModal"
import { SettlementData } from "../../lib/types/settlementTypes"
import { CardDetailsDebt } from "../CardDetailsDebt/CardDetailsDebt"
import { CardDetailsDebtor } from "../CardDetailsDebtor/CardDetailsDebtor"
import { CardDetailsDocuments } from "../CardDetailsDocuments/CardDetailsDocuments"

import { createVirtualColumns } from "./columnFactory"
import "./styles.scss"

interface Props {
  currentSubSection?: AnySubSection
  onNavigateToItem?: (target: NavigationTarget) => void
}

export const PreparationSettlementPage: React.FC<Props> = ({ currentSubSection, onNavigateToItem }) => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, total } = useAppSelector((state) => state.debtors)
  const { defaultVisible, displayOrder, requiredColumns } = SETTLEMENT_TABLE_CONFIG

  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
    storageKey: "debtors-settlement-table-columns",
  })

  const { clearSelection, handleRowSelect, handleSelectAll, selectedRow } = useTableRowSelection(debtors)

  const { handlePageChange, handlePageSizeChange } = useTablePagination({
    fetchData: getDebtorsNew,
    page,
    pageSize,
    setPageAction: debtorsActions.setPage,
    setPageSizeAction: debtorsActions.setPageSize,
    total,
  })

  const { close, editingData, isOpen, open } = useEditModal()

  const { cellState, closePopupInfoCell, handleCellClick } = useCellInteractions<SettlementData>()

  const handleDeleteSelected = () => {
    const ids = Array.from(selectedRow)
    console.info("Удалить:", ids)
  }

  const onViewCase = (rowData: SettlementData) => {
    onNavigateToItem?.({
      caseId: rowData.id,
      detailType: DetailType.CASE,
      originSection: Menu.preparation,
      originSubSection: currentSubSection,
    })
  }

  const virtualColumns = createVirtualColumns(open, handleCellClick, onViewCase)

  useEffect(() => {
    dispatch(getDebtorsNew({ page: 0, pageSize: 20 }))
    return () => {
      dispatch(debtorsActions.clearSearchedAccounts())
      dispatch(debtorsActions.clearDebtorsState())
    }
  }, [dispatch])

  return (
    <>
      <div className="initial-table-container">
        <BaseTable<SettlementData, BaseColumnSettlement, VirtualColumnSettlementKey>
          config={{
            ...SETTLEMENT_TABLE_CONFIG,
            virtualColumns: {
              ...SETTLEMENT_TABLE_CONFIG.virtualColumns,
              ...virtualColumns,
            },
          }}
          activeCellKey={cellState.activeCellKey}
          changeVisibleColumns={handleChangeVisibleColumns}
          className="initial-table-container__table"
          currentPage={page}
          data={debtors as SettlementData[]}
          isFetching={isLoading}
          isOpenExpandedInfoCell={cellState.isOpenViewInfoCell}
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
        {isOpen && editingData && (
          <Panel isOpen={isOpen} onClose={close} title="Долг">
            <div>Пока пусто</div>
          </Panel>
        )}
      </div>

      <BulkActionsPanel onClearSelection={clearSelection} onDelete={handleDeleteSelected} selectedRow={selectedRow} />

      {cellState.isOpenViewInfoCell && cellState.dataRow && cellState.currentCell && cellState.columnName && (
        <CellPopup anchorElement={cellState.currentCell} isOpen={cellState.isOpenViewInfoCell} onClose={closePopupInfoCell}>
          {cellState.columnName === VirtualColumnSettlementKey.DEBTOR && (
            <CardDetailsDebtor debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
          {cellState.columnName === VirtualColumnSettlementKey.DEBT && <CardDetailsDebt debtor={cellState.dataRow} />}
          {cellState.columnName === VirtualColumnSettlementKey.DOCUMENTS && (
            <CardDetailsDocuments debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
        </CellPopup>
      )}
    </>
  )
}
