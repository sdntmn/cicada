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
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.FIO,
    sorter: (a, b) => a.fio.localeCompare(b.fio),
    title: "ФИО",
    type: "data",
  },
  [BaseColumnTableSelect.PENALTY]: {
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.PENALTY,
    sorter: (a, b) => Number(a.penalty) - Number(b.penalty),
    title: "Пени",
    type: "data",
  },
  [BaseColumnTableSelect.STATUS]: {
    isFilterable: true,
    isSortable: true,
    name: BaseColumnTableSelect.STATUS,
    render: (status) => {
      const color = status === "active" ? "green" : "red"
      const text = status === "active" ? "green" : "red"
      return <span style={{ color }}>{text}</span>
    },
    sorter: (a, b) => Number(a.penalty) - Number(b.penalty),
    title: "Статус",
    type: "data",
  },
}

export const VIRTUAL_COLUMN: VirtualColumn<Account> = {
  align: "center",
  isFilterable: true,
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
  BaseColumnTableSelect.STATUS,
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
  BaseColumnTableSelect.STATUS,
]

export const COLUMN_LABELS: Record<ColumnTableSelect, string> = {
  [BaseColumnTableSelect.ACCOUNT]: "Лицевой счет",
  [BaseColumnTableSelect.ADDRESS]: "Адрес",
  [BaseColumnTableSelect.CITY]: "Город",
  [BaseColumnTableSelect.DEBT]: "Долг",
  [BaseColumnTableSelect.FIO]: "ФИО",
  [BaseColumnTableSelect.PENALTY]: "Пени",
  [BaseColumnTableSelect.STATUS]: "Статус",
  [VirtualColumnTableSelect.INDEX]: "№",
}
