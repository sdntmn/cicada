import type { DataColumn, VirtualColumn } from "@/shared/lib/types/table"

import type { ColumnAnalysisData, InitialData } from "../types/analysisTypes"

import { BaseColumn, VirtualColumnAnalysisTableKey } from "./keysColumns"

export const BASE_COLUMNS_TABLE: Record<BaseColumn, DataColumn<InitialData>> = {
  [BaseColumn.INDEX]: {
    align: "center",
    isSortable: false,
    name: BaseColumn.INDEX,
    title: "№",
    type: "data",
  },
}

export const VIRTUAL_COLUMNS_TABLE: Record<VirtualColumnAnalysisTableKey, VirtualColumn<InitialData>> = {
  [VirtualColumnAnalysisTableKey.ACTION]: {
    name: VirtualColumnAnalysisTableKey.ACTION,
    render: () => null,
    title: "",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.DEBT]: {
    name: VirtualColumnAnalysisTableKey.DEBT,
    render: () => null,
    title: "Дол",
    type: "virtual",
  },
  [VirtualColumnAnalysisTableKey.DEBTOR]: {
    name: VirtualColumnAnalysisTableKey.DEBTOR,
    render: () => null,
    title: "Должник",
    type: "virtual",
  },

  [VirtualColumnAnalysisTableKey.DOCUMENTS]: {
    name: VirtualColumnAnalysisTableKey.DOCUMENTS,
    render: () => null,
    title: "Документы",
    type: "virtual",
  },

  [VirtualColumnAnalysisTableKey.STAGE]: {
    name: VirtualColumnAnalysisTableKey.STAGE,
    render: () => null,
    title: "Стадия",
    type: "virtual",
  },
}

// Столбцы отображаемые по умолчанию для таблицы
export const DEFAULT_VISIBLE: ColumnAnalysisData[] = [
  BaseColumn.INDEX,
  VirtualColumnAnalysisTableKey.STAGE,
  VirtualColumnAnalysisTableKey.DOCUMENTS,
  VirtualColumnAnalysisTableKey.DEBTOR,
  VirtualColumnAnalysisTableKey.DEBT,
  VirtualColumnAnalysisTableKey.ACTION,
]

// Исключение колонок, которые не должны отображаться в меню выбора столбцов
export const REQUIRED_COLUMNS = new Set<ColumnAnalysisData>([BaseColumn.INDEX, VirtualColumnAnalysisTableKey.ACTION])

// Для вывода колонок в нужной последовательности
export const TABLE_DISPLAY_ORDER: ColumnAnalysisData[] = [
  BaseColumn.INDEX,
  VirtualColumnAnalysisTableKey.DEBT,
  VirtualColumnAnalysisTableKey.DEBTOR,
  VirtualColumnAnalysisTableKey.DOCUMENTS,
  VirtualColumnAnalysisTableKey.STAGE,
  VirtualColumnAnalysisTableKey.ACTION,
]

// Для отображения в меню выбора столбцов
export const COLUMN_LABELS: Record<ColumnAnalysisData, string> = {
  [BaseColumn.INDEX]: "№",
  [VirtualColumnAnalysisTableKey.ACTION]: "Действия",
  [VirtualColumnAnalysisTableKey.DEBT]: "Долг",
  [VirtualColumnAnalysisTableKey.DEBTOR]: "Должник",
  [VirtualColumnAnalysisTableKey.DOCUMENTS]: "Документы",
  [VirtualColumnAnalysisTableKey.STAGE]: "Стадия",
}
