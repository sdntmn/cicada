import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../constants/enums"

export interface RowType {
  account: string
  address: string
  city: string
  id: string
  population: string
}

export type ColumnTableSelect = VirtualColumnTableSelect | BaseColumnTableSelect
