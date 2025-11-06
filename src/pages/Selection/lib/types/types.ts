import { BaseColumnTableSelect, VirtualColumnTableSelect } from "../constants"

export interface HouseOption {
  id: string
  name: string
}

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
