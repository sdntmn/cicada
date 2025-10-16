import React from "react"

import { Account } from "@/entities/Accounts"
import { DataColumn, VirtualColumn } from "@/shared/ui/TableSort/types"

import { ColumnTableSelect } from "../types/table"

import { BaseColumnTableSelect, VirtualColumnTableSelect } from "./enums"

export const SELECTION_TABLE_COLUMNS: Record<BaseColumnTableSelect, DataColumn<Account>> = {
  [BaseColumnTableSelect.ACCOUNT]: {
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
    isSortable: true,
    name: BaseColumnTableSelect.CITY,
    title: "Город",
    type: "data",
  },
  [BaseColumnTableSelect.DEBT]: {
    isSortable: true,
    name: BaseColumnTableSelect.DEBT,
    sorter: (a, b) => Number(a.debt) - Number(b.debt),
    title: "Долг",
    type: "data",
  },
  [BaseColumnTableSelect.FIO]: {
    isSortable: true,
    name: BaseColumnTableSelect.FIO,
    sorter: (a, b) => a.fio.localeCompare(b.fio),
    title: "ФИО",
    type: "data",
  },
  [BaseColumnTableSelect.PENALTY]: {
    isSortable: true,
    name: BaseColumnTableSelect.PENALTY,
    sorter: (a, b) => Number(a.penalty) - Number(b.penalty),
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
