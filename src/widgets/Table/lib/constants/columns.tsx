import React from "react"

import { Account } from "@/entities/Account"
import { DataColumn, VirtualColumn } from "@/shared/ui/TableSort/types"

import { ColumnTableSelect } from "../types/table"

import { BaseColumnTableSelect, VirtualColumnTableSelect } from "./enums"

const parseDebtValue = (value: any): number => {
  if (value == null || value === "") {
    return 0
  }
  const str = String(value).trim()
  if (str === "—" || str === "–" || str === "-") {
    return 0
  }
  const normalized = str.replace(/\s+/g, "").replace(",", ".")
  const num = Number(normalized)
  return isNaN(num) ? 0 : num
}

const formatCurrency = (value: number): React.ReactNode => {
  const formatted = value.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return <span className="table-number">{formatted}</span>
}
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
}

export const VIRTUAL_COLUMN: VirtualColumn<Account> = {
  align: "center",
  name: "index",
  render: (_, rowIndex) => <span>{Number(rowIndex) + 1}</span>,
  title: "№",
  type: "virtual",
}

export const DEFAULT_VISIBLE: ColumnTableSelect[] = [
  VirtualColumnTableSelect.INDEX,
  BaseColumnTableSelect.FIO,
  BaseColumnTableSelect.ACCOUNT,
  BaseColumnTableSelect.DEBT,
  BaseColumnTableSelect.ADDRESS,
  BaseColumnTableSelect.CITY,
  BaseColumnTableSelect.PENALTY,
]

export const REQUIRED_COLUMNS = new Set<ColumnTableSelect>([BaseColumnTableSelect.ACCOUNT, BaseColumnTableSelect.FIO])

export const SELECTION_TABLE_DISPLAY_ORDER: ColumnTableSelect[] = [
  VirtualColumnTableSelect.INDEX,
  BaseColumnTableSelect.ACCOUNT,
  BaseColumnTableSelect.FIO,
  BaseColumnTableSelect.ADDRESS,
  BaseColumnTableSelect.CITY,
  BaseColumnTableSelect.DEBT,
  BaseColumnTableSelect.PENALTY,
]

export const COLUMN_LABELS: Record<ColumnTableSelect, string> = {
  [BaseColumnTableSelect.ACCOUNT]: "Лицевой счет",
  [BaseColumnTableSelect.ADDRESS]: "Адрес",
  [BaseColumnTableSelect.CITY]: "Город",
  [BaseColumnTableSelect.DEBT]: "Долг",
  [BaseColumnTableSelect.FIO]: "ФИО",
  [BaseColumnTableSelect.PENALTY]: "Пени",
  [VirtualColumnTableSelect.INDEX]: "№",
}
