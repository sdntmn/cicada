import { DebtStage } from "@/shared/constants"

export enum FilterMode {
  ALL = "all",
  ANY = "any",
}

export interface BaseDebtorApi {
  account_number: string
  address: AddressApi
  debt: string
  debt_term_months: number
  fio: string
  house_id: string
  id: string
  penalty: string
  rowIndex: number
}

export interface AddressApi {
  apartment: string
  city: string
  house: string
  street: string
}

export interface SearchDebtorParams {
  filterMode?: FilterMode
  houseIds?: string[]
  minDebt?: number
  minTerm?: number
  page: number
  pageSize: number
}
export interface SearchNewDebtorParams {
  page: number
  pageSize: number
}

export interface NewDebtorApi extends BaseDebtorApi {
  debt_stage: DebtStage
}
