import { FilterMode } from "@/shared/api/DebtorApi"
import { ErrorResponse } from "@/shared/api/types"
import { DebtStage } from "@/shared/constants"
import { PageSize } from "@/shared/lib/types/types"

export interface BaseDebtor {
  account: string
  address: string
  city: string
  debt: string
  debtTermMounts?: number
  fio: string
  houseId: string
  id: string
  penalty: string
  rowIndex: number
}

export interface DebtorAddress {
  address: {
    city: string
    flat: string
    house: string
    street: string
  }
}

export interface SearchParams {
  filterMode?: FilterMode
  houseIds?: string[]
  minDebt?: number
  minTerm?: number
}

export type Debtor = BaseDebtor | NewDebtor

export interface DebtorStorage {
  debtors?: Debtor[]
  errorResponse: ErrorResponse
  isLoading: boolean
  page: number
  pageSize: PageSize
  rowIndex: number
  searchParams: SearchParams
  total: number
}

export interface NewDebtor extends BaseDebtor {
  stage: DebtStage
}
