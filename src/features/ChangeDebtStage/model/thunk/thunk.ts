import { createAsyncThunk } from "@reduxjs/toolkit"

import { apiStageDebt } from "@/shared/api/DebtStageApi"
import { DebtStageResponse } from "@/shared/api/DebtStageApi/types"

export const сhangeDebtStageToNew = createAsyncThunk<DebtStageResponse, string[], { rejectValue: unknown }>(
  "changeDebtStage/moveToNew",
  async (accountIds, { rejectWithValue }) => {
    try {
      const response = await apiStageDebt.toNew(accountIds)

      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const сhangeDebtStageToCandidates = createAsyncThunk<DebtStageResponse, string[], { rejectValue: unknown }>(
  "changeDebtStage/moveToCandidates",
  async (accountIds, { rejectWithValue }) => {
    try {
      const response = await apiStageDebt.toCandidates(accountIds)

      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
