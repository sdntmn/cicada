/* eslint-disable camelcase */

import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import { BaseDebtorApi, NewDebtorApi, SearchDebtorParams, SearchNewDebtorParams } from "./types"

class ApiDebtors {
  getDebtorStageNew = async (params: SearchNewDebtorParams): Promise<NewDebtorApi[]> =>
    await call<NewDebtorApi[]>({
      body: JSON.stringify(params),
      headers: HEADERS,
      method: METHOD.POST,
      url: endpoints.urlFor(endpoints.debtorNew()),
    })

  searchDebtors = async (params: SearchDebtorParams): Promise<BaseDebtorApi[]> =>
    await call<NewDebtorApi[]>({
      body: JSON.stringify(params),
      headers: HEADERS,
      method: METHOD.POST,
      url: endpoints.urlFor(endpoints.searchDebtorByHouses()),
    })
}

export const apiDebtors = new ApiDebtors()
export * from "./types"
