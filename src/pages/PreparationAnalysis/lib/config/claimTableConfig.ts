import { ColumnConfig } from "@/shared/lib/types/table"

import { BaseColumn, VirtualColumnClaimTable } from "../constants"
import {
  ACTION_COLUMN,
  CLAIM_COLUMN_LABELS,
  CLAIM_TABLE_COLUMNS,
  CLAIM_TABLE_DISPLAY_ORDER,
  DEFAULT_VISIBLE,
  INDEX_COLUMN,
  NUMBER_DEBTORS,
  DEBTOR,
  PREMISES_DATA,
  REQUIRED_COLUMNS,
} from "../constants/claimColumn"
import { Claim } from "../types/claimTypes"

export const CLAIM_TABLE_CONFIG: ColumnConfig<Claim, BaseColumn, VirtualColumnClaimTable> = {
  columnLabels: CLAIM_COLUMN_LABELS,
  columns: CLAIM_TABLE_COLUMNS,
  defaultVisible: DEFAULT_VISIBLE,
  displayOrder: CLAIM_TABLE_DISPLAY_ORDER,
  requiredColumns: REQUIRED_COLUMNS,
  virtualColumns: {
    [VirtualColumnClaimTable.ACTION]: ACTION_COLUMN,
    [VirtualColumnClaimTable.INDEX]: INDEX_COLUMN,
    [VirtualColumnClaimTable.NUMBER_DEBTORS]: NUMBER_DEBTORS,
    [VirtualColumnClaimTable.DEBTOR]: DEBTOR,
    [VirtualColumnClaimTable.PREMISES_DATA]: PREMISES_DATA,
  },
}
