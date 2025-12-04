import React from "react"

import { VirtualColumn } from "@/shared/lib/types/table"

import { CellActions } from "../../ui/CellActions/CellActions"
import { CellDebt } from "../../ui/CellDebt/CellDebt"
import { CellDocuments } from "../../ui/CellDocuments/CellDocuments"
import { CellPersonData } from "../../ui/CellPersonData/CellPersonData"
import { CellPremisesData } from "../../ui/CellPremisesData/CellPremisesData"
import { CellStage } from "../../ui/CellStage/CellStage"
import { VirtualColumnInitialDataTableKey } from "../constants/columnKeysInitialData"
import type { InitialData } from "../types/initialDataTypes"

export const createVirtualColumns = (
  onEdit: (debtor: InitialData) => void,
  onCellClick: (rowData: InitialData, column: any, e: any) => void,
  onViewCase?: (rowData: InitialData) => void
): Record<VirtualColumnInitialDataTableKey, VirtualColumn<InitialData>> => ({
  [VirtualColumnInitialDataTableKey.ACTION]: {
    align: "center",
    name: VirtualColumnInitialDataTableKey.ACTION,
    render: (rowData: InitialData) => <CellActions onViewCase={onViewCase} rowData={rowData} />,
    title: "",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DEBTOR]: {
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.DEBTOR,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellPersonData rowData={rowData} />,
    title: "Персональные данные",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DEBTS]: {
    align: "right",
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.DEBTS,
    render: (rowData: InitialData) => <CellDebt rowData={rowData} />,
    title: "Долг / пени",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DOCUMENTS]: {
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.DOCUMENTS,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellDocuments onEdit={onEdit} rowData={rowData} />,
    title: "Документы",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.PREMISES_DATA]: {
    getFilterValue: (rowData) => [rowData.city, rowData.address].filter(Boolean).join(" "),
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.PREMISES_DATA,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellPremisesData rowData={rowData} />,
    title: "Данные о собственности",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.STAGE]: {
    name: VirtualColumnInitialDataTableKey.STAGE,
    render: (rowData: InitialData) => <CellStage rowData={rowData} />,
    title: "Стадия",
    type: "virtual",
  },
})
