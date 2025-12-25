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

import { ANALYSIS_TABLE_CONFIG } from "../../lib/config/config"
import { BaseColumn, VirtualColumnAnalysisTableKey } from "../../lib/constants/keysColumns"
import { getVisibleColumns } from "../../lib/helpers/getVisibleColumns/getVisibleColumns"
import { useCellInteractions } from "../../lib/hooks/useCellInteractions/useCellInteractions"
import { useEditModal } from "../../lib/hooks/useEditModal/useEditModal"
import { InitialData } from "../../lib/types/analysisTypes"
import { CardDetailsDebt } from "../CardDetailsDebt/CardDetailsDebt"
import { CardDetailsDebtor } from "../CardDetailsDebtor/CardDetailsDebtor"
import { CardDetailsDocuments } from "../CardDetailsDocuments/CardDetailsDocuments"

import { createVirtualColumns } from "./columnFactory"
import "./styles.scss"

interface Props {
  currentSubSection?: AnySubSection
  onNavigateToItem?: (target: NavigationTarget) => void
}

export const PreparationAnalysisPage: React.FC<Props> = ({ currentSubSection, onNavigateToItem }) => {
  const dispatch = useAppDispatch()
  const { debtors, isLoading, page, pageSize, total } = useAppSelector((state) => state.debtors)
  const { defaultVisible, displayOrder, requiredColumns } = ANALYSIS_TABLE_CONFIG

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

  const { cellState, closePopupInfoCell, handleCellClick } = useCellInteractions<InitialData>()

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

  const onViewCase = (rowData: InitialData) => {
    onNavigateToItem?.({
      caseId: rowData.id, // или как называется ID дела
      detailType: DetailType.CASE,
      originSection: Menu.preparation,
      originSubSection: currentSubSection,
    })
  }

  const virtualColumns = createVirtualColumns(open, handleCellClick, onViewCase)

  const previewColumns = getVisibleColumns(visibleColumns, ANALYSIS_TABLE_CONFIG)

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
        <BaseTable<InitialData, BaseColumn, VirtualColumnAnalysisTableKey>
          config={{
            ...ANALYSIS_TABLE_CONFIG,
            virtualColumns: {
              ...ANALYSIS_TABLE_CONFIG.virtualColumns,
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
        )}
      </div>

      <BulkActionsPanel onClearSelection={clearSelection} onDelete={handleDeleteSelected} selectedRow={selectedRow} />

      {cellState.isOpenViewInfoCell && cellState.dataRow && cellState.currentCell && cellState.columnName && (
        <CellPopup anchorElement={cellState.currentCell} isOpen={cellState.isOpenViewInfoCell} onClose={closePopupInfoCell}>
          {cellState.columnName === VirtualColumnAnalysisTableKey.DEBTOR && (
            <CardDetailsDebtor debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
          {cellState.columnName === VirtualColumnAnalysisTableKey.DEBT && <CardDetailsDebt debtor={cellState.dataRow} />}
          {cellState.columnName === VirtualColumnAnalysisTableKey.DOCUMENTS && (
            <CardDetailsDocuments debtor={cellState.dataRow} isOpen={cellState.isOpenViewInfoCell} />
          )}
        </CellPopup>
      )}
    </>
  )
}
