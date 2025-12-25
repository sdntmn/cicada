import type { FilterMode } from "@/shared/api/DebtorApi"

import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../constants"

export type ColumnTableSelect = VirtualColumnTableSelect | BaseColumnTableSelect

export interface AccountRowType {
  account: string
  address: string
  city: string
  debt: number
  fio: string
  id: string
  penalty: number
}

export type AccountColumn = VirtualColumnTableSelect | BaseColumnTableSelect

export interface SavedSearchQuery {
  filterMode?: string
  houseIds?: string[]
  minDebt?: number
  minTerm?: number
  timestamp: number
}

export interface SearchHistoryItem {
  filterMode?: FilterMode
  houseIds?: string[]
  minDebt?: number
  minTerm?: number
  previewAddresses?: string[]
  // payments?: string[]; // reserved
  // services?: string[]; // reserved
  timestamp: number
}
