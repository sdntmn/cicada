import { ApiWithAbortController } from "../ApiWithAbortController"
import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import type { PremisesResponse } from "./types"

class ApiPremises extends ApiWithAbortController {
  async getPremises(): Promise<PremisesResponse> {
    const result = await call<PremisesResponse>({
      headers: HEADERS,
      method: METHOD.GET,
      signal: this.newControllerSignal(),
      url: endpoints.urlFor(endpoints.premises()),
    })

    return result
  }
}

export const apiPremises = new ApiPremises()
export * from "./types"
