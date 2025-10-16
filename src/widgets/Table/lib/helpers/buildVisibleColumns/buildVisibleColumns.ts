import { Account } from "@/entities/Accounts"
import { Column } from "@/shared/ui/TableSort/types"

import { SELECTION_TABLE_COLUMNS, SELECTION_TABLE_DISPLAY_ORDER, VIRTUAL_COLUMN } from "../../constants/columns"
import { VirtualColumnTableSelect } from "../../constants/enums"
import { ColumnTableSelect } from "../../types/table"

export const buildVisibleColumns = (selectedColumns: Set<ColumnTableSelect>): Column<Account>[] =>
  SELECTION_TABLE_DISPLAY_ORDER.filter((key) => selectedColumns.has(key)).map((key) => {
    if (key === VirtualColumnTableSelect.INDEX) {
      return VIRTUAL_COLUMN
    }
    return SELECTION_TABLE_COLUMNS[key]
  })
