import { DebtStage } from "@/shared/constants"

export interface DebtStageApi {
  account_ids: string[]
  moved_count: number
  moved_ids: string[]
  success: boolean
  to_stage: DebtStage
  unchanged_count: number
}

export type DebtStageResponse = DebtStageApi
