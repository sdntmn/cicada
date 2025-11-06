import { Account } from "@/entities/Account"
import { ColumnConfig } from "@/shared/lib/types/table"

import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../constants"
import {
  DEFAULT_VISIBLE,
  REQUIRED_COLUMNS,
  SELECT_COLUMN_LABELS,
  SELECTION_TABLE_COLUMNS,
  SELECTION_TABLE_DISPLAY_ORDER,
  VIRTUAL_COLUMN,
} from "../constants/columns"

export const SELECTION_COLUMNS_CONFIG: ColumnConfig<Account, BaseColumnTableSelect, VirtualColumnTableSelect> = {
  columnLabels: SELECT_COLUMN_LABELS,
  columns: SELECTION_TABLE_COLUMNS,
  defaultVisible: DEFAULT_VISIBLE,
  displayOrder: SELECTION_TABLE_DISPLAY_ORDER,
  requiredColumns: REQUIRED_COLUMNS,
  virtualColumns: {
    [VirtualColumnTableSelect.INDEX]: VIRTUAL_COLUMN,
  },
}
