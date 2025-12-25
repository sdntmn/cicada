import React, { useEffect } from "react"

import { debtorsActions } from "@/entities/Debtor"
import { getDebtorsNew } from "@/entities/Debtor/model/thunk/thunk"
import { useTablePagination, useTableRowSelection } from "@/shared/lib/hooks"
import { useTableColumns } from "@/shared/lib/hooks/useTableColumns/useTableColumns"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { BulkActionsPanel } from "@/shared/ui/BulkActionsPanel"
import { Panel } from "@/shared/ui/Panel/Panel"
import { PositionPortal } from "@/shared/ui/PositionPortal"
import { BaseTable } from "@/widgets/BaseTable"

import { createVirtualColumns } from "../../lib/config/columnFactoryInitialTable"
import { INITIAL_DATA_TABLE_CONFIG } from "../../lib/config/initialDataTableConfig"
import { BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey } from "../../lib/constants/columnKeysInitialData"
import { getVisibleColumns } from "../../lib/helpers/getVisibleColumns/getVisibleColumns"
import { useCellInteractions } from "../../lib/hooks/useCellInteractions/useCellInteractions"
import { useEditModal } from "../../lib/hooks/useEditModal/useEditModal"
import { InitialData } from "../../lib/types/initialDataTypes"
import { CardDebt } from "../CardDebt/CardDebt"
import { CardDetailsDocuments } from "../CardDetailsDocuments/CardDetailsDocuments"
import { AnalysisEditForm } from "../EditForm/EditForm"

import "./styles.scss"
import { CardDetailsDebtor } from "@/pages/PreparationAnalysis/ui/CardDetailsDebtor/CardDetailsDebtor"

interface Props {
  // navigationMode: "detail" | "main"
  onDetailOpen: (detail: { component: React.ComponentType; props?: any; subSection: string }) => void
  // onNavigateToItem: (target: { itemId: string; section: Menu; subSection: string }) => void
}

export const PreparationClaimPage: React.FC<Props> = ({ onDetailOpen }) => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, total } = useAppSelector((state) => state.debtors)
  const { defaultVisible, displayOrder, requiredColumns } = INITIAL_DATA_TABLE_CONFIG

  const { handleChangeVisibleColumns, selectedColumns, visibleColumns } = useTableColumns({
    defaultVisible,
    displayOrder,
    requiredColumns,
    storageKey: "debtors-initial-table-columns",
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

  const { close, editingData, isOpen, open, selectedDebtor } = useEditModal()

  const { cellState, closePopupInfoCell, handleCellClick } = useCellInteractions()

  const handleSave = async () => {
    if (!selectedDebtor) {
      return
    }
    try {
      close()
    } catch (error) {
      console.error("Ошибка при сохранении:", error)
    }
  }

  const handleDeleteSelected = () => {
    const ids = Array.from(selectedRow)
    console.info("Удалить:", ids)
  }

  const handleEditClick = (item: any) => {
    // Открываем форму редактирования в детальном режиме
    onDetailOpen({
      component: AnalysisEditForm,
      props: { data: debtors, itemId: item.id },
      subSection: "analysis", // Указываем из какой подсекции открываем
    })
  }

  const openEditPanel = () => {
    if (cellState.isOpenViewInfoCell) {
      closePopupInfoCell()
    }
    open(selectedDebtor)
  }

  const virtualColumns = createVirtualColumns(openEditPanel, handleCellClick)

  const previewColumns = getVisibleColumns(visibleColumns, INITIAL_DATA_TABLE_CONFIG)

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
        <BaseTable<InitialData, BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey>
          config={{
            ...INITIAL_DATA_TABLE_CONFIG,
            virtualColumns: {
              ...INITIAL_DATA_TABLE_CONFIG.virtualColumns,
              ...virtualColumns,
            },
          }}
          activeCellKey={cellState.activeCellKey}
          changeVisibleColumns={handleChangeVisibleColumns}
          className="initial-table-container__table"
          currentPage={page}
          data={debtors as InitialData[]}
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
          // <InitialDataEditModal
          //   isOpen={isOpen}
          //   onClose={close}
          //   onSave={handleSave}
          //   rowData={editingData}
          //   title="Редактирование должника"
          //   visibleColumns={previewColumns}
          // >
          //   <div>Пока пусто</div>
          // </InitialDataEditModal>
        )}
      </div>

      <BulkActionsPanel onClearSelection={clearSelection} onDelete={handleDeleteSelected} selectedRow={selectedRow} />

      {cellState.isOpenViewInfoCell && cellState.dataRow && cellState.currentCell && cellState.columnName && (
        <PositionPortal
          anchorElement={cellState.currentCell}
          distanceBetweenElements={0}
          isOpen={cellState.isOpenViewInfoCell}
          onClose={closePopupInfoCell}
        >
          {cellState.columnName === VirtualColumnInitialDataTableKey.DEBTOR && (
            <CardDetailsDebtor debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
          {cellState.columnName === VirtualColumnInitialDataTableKey.PREMISES_DATA && (
            <CardDebt debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
          {cellState.columnName === VirtualColumnInitialDataTableKey.DOCUMENTS && (
            <CardDetailsDocuments debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
        </PositionPortal>
      )}
    </>
  )
}
