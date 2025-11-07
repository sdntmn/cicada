import React from "react"

import { Account } from "@/entities/Account"
import { Column, DataColumn, VirtualColumn } from "@/shared/lib/types/table"

import { formatCurrency, parseDebtValue } from "../helpers/parseDebtValue/parseDebtValue"
import { ColumnTableSelect } from "../types/types"

import { BaseColumnTableSelect, VirtualColumnTableSelect } from "./enum"

export const SELECTION_TABLE_COLUMNS: Record<BaseColumnTableSelect, DataColumn<Account>> = {
  [BaseColumnTableSelect.ACCOUNT]: {
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.ACCOUNT,
    title: "Лицевой счет",
    type: "data",
  },
  [BaseColumnTableSelect.ADDRESS]: {
    isSortable: false,
    name: BaseColumnTableSelect.ADDRESS,
    title: "Адрес",
    type: "data",
  },
  [BaseColumnTableSelect.CITY]: {
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.CITY,
    title: "Город",
    type: "data",
  },
  [BaseColumnTableSelect.DEBT]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.DEBT,
    render: (value) => formatCurrency(parseDebtValue(value)),
    sorter: (a, b) => parseDebtValue(a.debt) - parseDebtValue(b.debt),
    title: "Долг",
    type: "data",
  },
  [BaseColumnTableSelect.FIO]: {
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.FIO,
    sorter: (a, b) => a.fio.localeCompare(b.fio),
    title: "ФИО",
    type: "data",
  },
  [BaseColumnTableSelect.PENALTY]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.PENALTY,
    render: (value) => formatCurrency(parseDebtValue(value)),
    sorter: (a, b) => parseDebtValue(a.penalty) - parseDebtValue(b.penalty),
    title: "Пени",
    type: "data",
  },
  [BaseColumnTableSelect.TERM_DEBT]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.TERM_DEBT,
    sorter: (a, b) => parseDebtValue(a.debtTermMounts) - parseDebtValue(b.debtTermMounts),
    title: "Срок / мес.",
    type: "data",
  },
}

export const VIRTUAL_COLUMN: VirtualColumn<Account> = {
  align: "center",
  name: "index",
  render: (_: any, rowIndex: number) => <span>{Number(rowIndex) + 1}</span>,
  title: "№",
  type: "virtual",
}

export const ALL_COLUMNS_CONFIG: Record<ColumnTableSelect, Column<Account>> = {
  ...SELECTION_TABLE_COLUMNS,
  [VirtualColumnTableSelect.INDEX]: VIRTUAL_COLUMN,
}

export const DEFAULT_VISIBLE: ColumnTableSelect[] = [
  VirtualColumnTableSelect.INDEX,
  BaseColumnTableSelect.FIO,
  BaseColumnTableSelect.ACCOUNT,
  BaseColumnTableSelect.DEBT,
  BaseColumnTableSelect.ADDRESS,
  BaseColumnTableSelect.CITY,
  BaseColumnTableSelect.PENALTY,
  BaseColumnTableSelect.TERM_DEBT,
]

export const REQUIRED_COLUMNS = new Set<ColumnTableSelect>([BaseColumnTableSelect.ACCOUNT, BaseColumnTableSelect.FIO])

export const SELECTION_TABLE_DISPLAY_ORDER: ColumnTableSelect[] = [
  VirtualColumnTableSelect.INDEX,
  BaseColumnTableSelect.ACCOUNT,
  BaseColumnTableSelect.FIO,
  BaseColumnTableSelect.ADDRESS,
  BaseColumnTableSelect.CITY,
  BaseColumnTableSelect.TERM_DEBT,
  BaseColumnTableSelect.DEBT,
  BaseColumnTableSelect.PENALTY,
]

export const SELECT_COLUMN_LABELS: Record<ColumnTableSelect, string> = {
  [BaseColumnTableSelect.ACCOUNT]: "Лицевой счет",
  [BaseColumnTableSelect.ADDRESS]: "Адрес",
  [BaseColumnTableSelect.CITY]: "Город",
  [BaseColumnTableSelect.DEBT]: "Долг",
  [BaseColumnTableSelect.FIO]: "ФИО",
  [BaseColumnTableSelect.PENALTY]: "Пени",
  [BaseColumnTableSelect.TERM_DEBT]: "Срок / мес.",
  [VirtualColumnTableSelect.INDEX]: "№",
}
