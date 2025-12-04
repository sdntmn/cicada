import React from "react"

import { VirtualColumn } from "@/shared/lib/types/table"

import { CellActions } from "../../ui/CellActions/CellActions"
import { CellDocuments } from "../../ui/CellDocuments/CellDocuments"
import { CellPersonData } from "../../ui/CellPersonData/CellPersonData"
import { CellPremisesData } from "../../ui/CellPremisesData/CellPremisesData"
import { CellStage } from "../../ui/CellStage/CellStage"
import { VirtualColumnInitialDataTableKey } from "../constants/columnKeysInitialData"
import type { InitialData } from "../types/initialDataTypes"

export const createVirtualColumns = (
  onEdit: (debtor: any) => void,
  onCellClick: (rowData: any, column: any, e: any) => void
): Record<VirtualColumnInitialDataTableKey, VirtualColumn<InitialData>> => ({
  [VirtualColumnInitialDataTableKey.ACTION]: {
    align: "center",
    name: VirtualColumnInitialDataTableKey.ACTION,
    render: (rowData: InitialData) => <CellActions onEdit={onEdit} rowData={rowData} />,
    title: "",
    type: "virtual",
  },
  // [VirtualColumnInitialDataTableKey.DEBTS]: {
  //   align: "right",
  //   isFilterable: true,
  //   name: VirtualColumnInitialDataTableKey.DEBTS,
  //   render: (rowData: InitialData) => <CellDebt rowData={rowData} />,
  //   title: "Долг / пени",
  //   type: "virtual",
  // },
  [VirtualColumnInitialDataTableKey.DOCUMENTS]: {
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.DOCUMENTS,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellDocuments rowData={rowData} />,
    title: "Документы",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DEBTOR]: {
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.DEBTOR,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellPersonData rowData={rowData} />,
    title: "Должник",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.PREMISES_DATA]: {
    getFilterValue: (rowData) => [rowData.city, rowData.address].filter(Boolean).join(" "),
    isFilterable: true,
    name: VirtualColumnInitialDataTableKey.PREMISES_DATA,
    onCellClick: (rowData, column, e) => onCellClick(rowData, column, e),
    render: (rowData: InitialData) => <CellPremisesData rowData={rowData} />,
    title: "Долг",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.STAGE]: {
    name: VirtualColumnInitialDataTableKey.STAGE,
    render: (rowData: InitialData) => <CellStage rowData={rowData} />,
    title: "Стадия",
    type: "virtual",
  },
})
