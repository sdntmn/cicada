import React from "react"

import { VirtualColumn } from "@/shared/lib/types/table"

import { VirtualColumnAnalysisTableKey } from "../../lib/constants/keysColumns"
import type { InitialData } from "../../lib/types/analysisTypes"
import { CellActions } from "../CellActions/CellActions"
import { CellDebt } from "../CellDebt/CellDebt"
import { CellDebtor } from "../CellDebtor/CellDebtor"
import { CellDocuments } from "../CellDocuments/CellDocuments"
import { CellStage } from "../CellStage/CellStage"

export const createVirtualColumns = (
  onEdit: (debtor: InitialData) => void,
  onCellClick: (rowData: InitialData, column: any, e: any) => void,
  onViewCase?: (rowData: InitialData) => void
): Record<VirtualColumnAnalysisTableKey, VirtualColumn<InitialData>> => ({
  [VirtualColumnAnalysisTableKey.ACTION]: {
    align: "center",
    name: VirtualColumnAnalysisTableKey.ACTION,
    render: (rowData: InitialData) => <CellActions onViewCase={onViewCase} rowData={rowData} />,
    title: "",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.DEBT]: {
    // align: "right",
    isFilterable: true,
    name: VirtualColumnAnalysisTableKey.DEBT,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellDebt onEdit={onEdit} rowData={rowData} />,
    title: "Долг",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.DEBTOR]: {
    isFilterable: true,
    name: VirtualColumnAnalysisTableKey.DEBTOR,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellDebtor rowData={rowData} />,
    title: "Должник",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.DOCUMENTS]: {
    isFilterable: true,
    name: VirtualColumnAnalysisTableKey.DOCUMENTS,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellDocuments onEdit={onEdit} rowData={rowData} />,
    title: "Документы",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.STAGE]: {
    name: VirtualColumnAnalysisTableKey.STAGE,
    render: (rowData: InitialData) => <CellStage rowData={rowData} />,
    title: "Стадия",
    type: "virtual",
  },
})
