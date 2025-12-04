import { DebtStageApi } from "@/shared/api/DebtStageApi/types"
import { DebtStage } from "@/shared/constants"

import { MoveDebtStage } from "../../types/types"

export const transformMoveDebtStage = (source: DebtStageApi): MoveDebtStage => ({
  movedCount: source.moved_count,
  movedIds: source.moved_ids,
  stage: source.to_stage as DebtStage,
  success: source.success,
  unchangedCount: source.unchanged_count,
})
