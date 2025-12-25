import { ColumnConfig } from "@/shared/lib/types/table"

import {
  BASE_COLUMNS_TABLE,
  COLUMN_LABELS,
  DEFAULT_VISIBLE,
  REQUIRED_COLUMNS,
  TABLE_DISPLAY_ORDER,
  VIRTUAL_COLUMNS_TABLE,
} from "../constants/columns"
import type { BaseColumn, VirtualColumnAnalysisTableKey } from "../constants/keysColumns"
import { InitialData } from "../types/analysisTypes"

export const ANALYSIS_TABLE_CONFIG: ColumnConfig<InitialData, BaseColumn, VirtualColumnAnalysisTableKey> = {
  columnLabels: COLUMN_LABELS,
  columns: BASE_COLUMNS_TABLE,
  defaultVisible: DEFAULT_VISIBLE,
  displayOrder: TABLE_DISPLAY_ORDER,
  requiredColumns: REQUIRED_COLUMNS,
  virtualColumns: VIRTUAL_COLUMNS_TABLE,
}
