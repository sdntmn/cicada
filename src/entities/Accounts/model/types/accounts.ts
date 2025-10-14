import { StatusDebtor } from "@/shared/constants"
import { ErrorResponse } from "@/shared/lib/api/types"

export interface Account {
  account: string
  address: string
  city: string
  debt: string
  fio: string
  id: string
  penalty: string
  status: StatusDebtor
}

export interface AccountsStorage {
  accounts?: Account[]
  errorResponse: ErrorResponse
  isLoading: boolean
}
