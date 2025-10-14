/* eslint-disable camelcase */

import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import type { UserApi } from "./types"

class ApiUser {
  getUser = async (account: string): Promise<UserApi> =>
    await call<UserApi>({
      headers: HEADERS,
      method: METHOD.GET,
      url: endpoints.urlFor(endpoints.user(account)),
    })
}

export const apiUser = new ApiUser()
export * from "./types"
