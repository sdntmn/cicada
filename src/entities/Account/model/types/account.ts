import { ErrorResponse } from "@/shared/api/types"

export interface Account {
  account: string
  address: string
  city: string
  debt: string
  fio: string
  id: string
  judicialDistrict?: string
  penalty: string
}

export interface AccountAddress {
  address: {
    city: string
    flat: string
    house: string
    street: string
  }
}

export interface AccountsStorage {
  accounts?: Account[]
  errorResponse: ErrorResponse
  isLoading: boolean
}
