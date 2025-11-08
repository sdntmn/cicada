import { FilterMode } from "@/shared/api/AccountsApi"
import { ErrorResponse } from "@/shared/api/types"
import { PageSize } from "@/shared/lib/types/types"

export interface Account {
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

export interface AccountAddress {
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

export interface AccountsStorage {
  accounts?: Account[]
  errorResponse: ErrorResponse
  isLoading: boolean
  page: number
  pageSize: PageSize
  rowIndex: number
  searchParams: SearchParams
  total: number
}
