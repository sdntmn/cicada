import { parseDebtValue } from "@/shared/lib/helpers"
import type { DataColumn, VirtualColumn } from "@/shared/lib/types/table"

import type { ColumnInitialData, InitialData } from "../types/initialDataTypes"

import { BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey } from "./columnKeysInitialData"

// Базовые колонки данных
export const INITIAL_DATA_TABLE_COLUMNS: Record<BaseColumnInitialDataTableKey, DataColumn<InitialData>> = {
  [BaseColumnInitialDataTableKey.INDEX]: {
    align: "center",
    isSortable: false,
    name: BaseColumnInitialDataTableKey.INDEX,
    title: "№",
    type: "data",
  },
  [BaseColumnInitialDataTableKey.TERM_DEBT]: {
    align: "right",
    isFilterable: true,
    isSortable: true,
    name: BaseColumnInitialDataTableKey.TERM_DEBT,
    sorter: (a, b) => parseDebtValue(a.debt - term - mounts) - parseDebtValue(b.debt - term - mounts),
    title: "Срок / мес.",
    type: "data",
  },
}

export const VIRTUAL_COLUMNS_STUBS: Record<VirtualColumnInitialDataTableKey, VirtualColumn<InitialData>> = {
  [VirtualColumnInitialDataTableKey.ACTION]: {
    name: VirtualColumnInitialDataTableKey.ACTION,
    render: () => null,
    title: "",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DEBTS]: {
    name: VirtualColumnInitialDataTableKey.DEBTS,
    render: () => null,
    title: "Долг / пени",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DOCUMENTS]: {
    name: VirtualColumnInitialDataTableKey.DOCUMENTS,
    render: () => null,
    title: "Документы",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.DEBTOR]: {
    name: VirtualColumnInitialDataTableKey.DEBTOR,
    render: () => null,
    title: "Персональные данные",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.PREMISES_DATA]: {
    name: VirtualColumnInitialDataTableKey.PREMISES_DATA,
    render: () => null,
    title: "Данные о собственности",
    type: "virtual",
  },
  [VirtualColumnInitialDataTableKey.STAGE]: {
    name: VirtualColumnInitialDataTableKey.STAGE,
    render: () => null,
    title: "Стадия",
    type: "virtual",
  },
}

// Столбцы отображаемые по умолчанию для таблицы
export const DEFAULT_VISIBLE: ColumnInitialData[] = [
  BaseColumnInitialDataTableKey.INDEX,
  BaseColumnInitialDataTableKey.TERM_DEBT,
  VirtualColumnInitialDataTableKey.DEBTS,
  VirtualColumnInitialDataTableKey.STAGE,
  VirtualColumnInitialDataTableKey.DOCUMENTS,
  VirtualColumnInitialDataTableKey.DEBTOR,
  VirtualColumnInitialDataTableKey.PREMISES_DATA,
  VirtualColumnInitialDataTableKey.ACTION,
]

// Исключение колонок, которые не должны отображаться в меню выбора столбцов
export const REQUIRED_COLUMNS = new Set<ColumnInitialData>([
  BaseColumnInitialDataTableKey.TERM_DEBT,
  VirtualColumnInitialDataTableKey.ACTION,
])

// Для вывода колонок в нужной последовательности
export const INITIAL_DATA_TABLE_DISPLAY_ORDER: ColumnInitialData[] = [
  BaseColumnInitialDataTableKey.INDEX,
  VirtualColumnInitialDataTableKey.PREMISES_DATA,
  VirtualColumnInitialDataTableKey.DEBTOR,
  VirtualColumnInitialDataTableKey.DOCUMENTS,
  VirtualColumnInitialDataTableKey.DEBTS,
  BaseColumnInitialDataTableKey.TERM_DEBT,
  VirtualColumnInitialDataTableKey.STAGE,
  VirtualColumnInitialDataTableKey.ACTION,
]

// Для отображения в меню выбора столбцов
export const INITIAL_DATA_COLUMN_LABELS: Record<ColumnInitialData, string> = {
  [BaseColumnInitialDataTableKey.INDEX]: "№",
  [BaseColumnInitialDataTableKey.TERM_DEBT]: "Срок / мес.",
  [VirtualColumnInitialDataTableKey.ACTION]: "Действия",
  [VirtualColumnInitialDataTableKey.DEBTS]: "Долг / пени",
  [VirtualColumnInitialDataTableKey.DOCUMENTS]: "Документы",
  [VirtualColumnInitialDataTableKey.DEBTOR]: "Персональные данные",
  [VirtualColumnInitialDataTableKey.PREMISES_DATA]: "Данные о собственности",
  [VirtualColumnInitialDataTableKey.STAGE]: "Стадия",
}
