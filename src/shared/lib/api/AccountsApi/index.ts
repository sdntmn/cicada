/* eslint-disable camelcase */

import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import type { AccountsApi } from "./types"

class ApiAccounts {
  getAccounts = async (): Promise<AccountsApi> =>
    await call<AccountsApi>({
      headers: HEADERS,
      method: METHOD.GET,
      url: endpoints.urlFor(endpoints.accounts()),
    })
}

export const apiAccounts = new ApiAccounts()
export * from "./types"
