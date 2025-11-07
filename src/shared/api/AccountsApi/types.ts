export enum FilterMode {
  ALL = "all",
  ANY = "any",
}

export interface AccountApi {
  account_number: string
  address: AccountAddressApi
  debt: string
  debt_term_months: number
  fio: string
  house_id: string
  id: string
  penalty: string
}

export interface AccountAddressApi {
  apartment: string
  city: string
  house: string
  street: string
}

export interface SearchAccountsParams {
  filterMode?: FilterMode
  houseIds?: string[]
  minDebt?: number
  minTerm?: number
}
