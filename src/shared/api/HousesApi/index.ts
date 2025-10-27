import { ApiWithAbortController } from "../ApiWithAbortController"
import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import type { HousesSearchResponse } from "./types"

class ApiHouses extends ApiWithAbortController {
  async getHouses(): Promise<HousesSearchResponse> {
    const result = await call<HousesSearchResponse>({
      headers: HEADERS,
      method: METHOD.GET,
      signal: this.newControllerSignal(),
      url: endpoints.urlFor(endpoints.houses()),
    })

    return result
  }
}

export const apiHouses = new ApiHouses()
export * from "./types"
