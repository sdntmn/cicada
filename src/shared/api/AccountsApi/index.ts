/* eslint-disable camelcase */

import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import { AccountApi, SearchAccountsParams } from "./types"

class ApiAccounts {
  getAccounts = async (): Promise<AccountApi[]> =>
    await call<AccountApi[]>({
      headers: HEADERS,
      method: METHOD.GET,
      url: endpoints.urlFor(endpoints.accounts()),
    })

  searchAccounts = async (params: SearchAccountsParams): Promise<AccountApi[]> =>
    await call<AccountApi[]>({
      body: JSON.stringify(params),
      headers: HEADERS,
      method: METHOD.POST,
      url: endpoints.urlFor(endpoints.searchDebtorByHouses()),
    })
}

export const apiAccounts = new ApiAccounts()
export * from "./types"
