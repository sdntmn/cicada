import React from "react"

import { formatCurrency, parseDebtValue } from "@/shared/lib/helpers"
import { DataColumn, VirtualColumn } from "@/shared/lib/types/table"

import { ActionEditCell } from "../../ui/ActionEditCell/ActionCell"
import { CellActions } from "../../ui/CellActions/CellActions"
import { Claim, ColumnClaim } from "../types/claimTypes"
import { ColumnInitialData } from "../types/initialDataTypes"

import { BaseColumn, VirtualColumnClaimTable } from "./enum"

export const CLAIM_TABLE_COLUMNS: Record<BaseColumn, DataColumn<Claim>> = {
  [BaseColumn.ADDRESS]: {
    isSortable: false,
    name: BaseColumn.ADDRESS,
    title: "Адрес",
    type: "data",
  },
  [BaseColumn.DEBT]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumn.DEBT,
    render: (value) => formatCurrency(parseDebtValue(value)),
    sorter: (a, b) => parseDebtValue(a.debt) - parseDebtValue(b.debt),
    title: "Долг",
    type: "data",
  },
  [BaseColumn.PENALTY]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumn.PENALTY,
    render: (value) => formatCurrency(parseDebtValue(value)),
    sorter: (a, b) => parseDebtValue(a.penalty) - parseDebtValue(b.penalty),
    title: "Пени",
    type: "data",
  },
  [BaseColumn.TERM_DEBT]: {
    align: "right",
    isFilterable: true,
    isSortable: false,
    name: BaseColumn.TERM_DEBT,
    sorter: (a, b) => parseDebtValue(a.debt - term - mounts) - parseDebtValue(b.debt - term - mounts),
    title: "Срок / мес.",
    type: "data",
  },
}

export const INDEX_COLUMN: VirtualColumn<Claim> = {
  align: "center",
  name: VirtualColumnClaimTable.INDEX,
  render: (_: any, rowIndex: number) => <span>{Number(rowIndex) + 1}</span>,
  title: "№",
  type: "virtual",
}

export const NUMBER_DEBTORS: VirtualColumn<Claim> = {
  align: "center",
  name: VirtualColumnClaimTable.NUMBER_DEBTORS,
  render: (value) => <span>{value.fio?.length}</span>,
  title: "Собственники",
  type: "virtual",
}
export const DEBTOR: VirtualColumn<Claim> = {
  name: VirtualColumnClaimTable.DEBTOR,
  render: (rowData: Claim) => (
    <ActionEditCell
      onEdit={() => {}} // Пустая функция в качестве заглушки
      rowData={rowData}
    />
  ),
  title: "Персональные данные",
  type: "virtual",
}
export const PREMISES_DATA: VirtualColumn<Claim> = {
  name: VirtualColumnClaimTable.PREMISES_DATA,
  render: () => <span>Заполнены</span>,
  title: "Данные о собственности",
  type: "virtual",
}

export const ACTION_COLUMN: VirtualColumn<Claim> = {
  name: VirtualColumnClaimTable.ACTION,
  render: (rowData: Claim) => <CellActions onEdit={() => {}} rowData={rowData} />,
  title: "Действие",
  type: "virtual",
}

// Столбцы по умолчанию для таблицы
export const DEFAULT_VISIBLE: ColumnClaim[] = [
  VirtualColumnClaimTable.INDEX,
  BaseColumn.ADDRESS,
  BaseColumn.TERM_DEBT,
  BaseColumn.DEBT,
  BaseColumn.PENALTY,
  VirtualColumnClaimTable.NUMBER_DEBTORS,
  VirtualColumnClaimTable.DEBTOR,
  VirtualColumnClaimTable.PREMISES_DATA,
  VirtualColumnClaimTable.ACTION,
]

// Исключение колонок, которые не должны отображаться в меню выбора столбцов
export const REQUIRED_COLUMNS = new Set<ColumnClaim>([BaseColumn.ADDRESS, BaseColumn.PENALTY, BaseColumn.DEBT, BaseColumn.TERM_DEBT])

// Для вывода колонок в нужной последовательности
export const CLAIM_TABLE_DISPLAY_ORDER: ColumnClaim[] = [
  VirtualColumnClaimTable.INDEX,
  BaseColumn.ADDRESS,
  VirtualColumnClaimTable.PREMISES_DATA,
  VirtualColumnClaimTable.NUMBER_DEBTORS,
  VirtualColumnClaimTable.DEBTOR,

  BaseColumn.DEBT,
  BaseColumn.PENALTY,
  BaseColumn.TERM_DEBT,
  VirtualColumnClaimTable.ACTION,
]

// Для отображения в меню выбора столбцов
export const CLAIM_COLUMN_LABELS: Record<ColumnInitialData, string> = {
  [BaseColumn.DEBT]: "Долг",
  [BaseColumn.PENALTY]: "Пени",
  [BaseColumn.TERM_DEBT]: "Срок / мес.",
  [VirtualColumnClaimTable.ACTION]: "Действия",
  [VirtualColumnClaimTable.INDEX]: "№",
  [VirtualColumnClaimTable.NUMBER_DEBTORS]: "Собственники",
  [VirtualColumnClaimTable.DEBTOR]: "Персональные данные",
  [VirtualColumnClaimTable.PREMISES_DATA]: "Данные о собственности",
}
