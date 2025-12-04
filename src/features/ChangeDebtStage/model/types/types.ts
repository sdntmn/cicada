import { ErrorResponse } from "@/shared/api/types"
import { DebtStage } from "@/shared/constants"

export interface DebtStageStorage {
  error: ErrorResponse
  isLoading: boolean
  moveDebtStage: MoveDebtStage
}

export interface MoveDebtStage {
  movedCount?: number
  movedIds?: string[]
  stage: DebtStage
  success?: boolean
  unchangedCount?: number
}
