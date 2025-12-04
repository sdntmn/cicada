import { ColumnConfig } from "@/shared/lib/types/table"

import type { BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey } from "../constants/columnKeysInitialData"
import {
  DEFAULT_VISIBLE,
  INITIAL_DATA_COLUMN_LABELS,
  INITIAL_DATA_TABLE_COLUMNS,
  INITIAL_DATA_TABLE_DISPLAY_ORDER,
  REQUIRED_COLUMNS,
  VIRTUAL_COLUMNS_STUBS,
} from "../constants/columnsInitialData"
import { InitialData } from "../types/initialDataTypes"

// Основная конфигурация таблицы
export const INITIAL_DATA_TABLE_CONFIG: ColumnConfig<InitialData, BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey> = {
  columnLabels: INITIAL_DATA_COLUMN_LABELS,
  columns: INITIAL_DATA_TABLE_COLUMNS,
  defaultVisible: DEFAULT_VISIBLE,
  displayOrder: INITIAL_DATA_TABLE_DISPLAY_ORDER,
  requiredColumns: REQUIRED_COLUMNS,
  virtualColumns: VIRTUAL_COLUMNS_STUBS,
}
