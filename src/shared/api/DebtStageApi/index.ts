import { HEADERS, METHOD } from "../constants"
import { endpoints } from "../Endpoints"
import { call } from "../utils"

import { DebtStageResponse } from "./types"

class ApiStageDebt {
  toCandidates = async (accountIds: string[]): Promise<DebtStageResponse> =>
    await call<DebtStageResponse>({
      body: JSON.stringify({ accountIds }),
      headers: HEADERS,
      method: METHOD.POST,
      url: endpoints.urlFor(endpoints.stageDebtToCandidates()),
    })

  toNew = async (accountIds: string[]): Promise<DebtStageResponse> =>
    await call<DebtStageResponse>({
      body: JSON.stringify({ accountIds }),
      headers: HEADERS,
      method: METHOD.POST,
      url: endpoints.urlFor(endpoints.stageDebtToNew()),
    })
}

export const apiStageDebt = new ApiStageDebt()
