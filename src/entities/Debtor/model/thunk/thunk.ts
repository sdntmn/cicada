import { createAsyncThunk } from "@reduxjs/toolkit"

import { apiDebtors, BaseDebtorApi, NewDebtorApi, SearchDebtorParams, SearchNewDebtorParams } from "@/shared/api/DebtorApi"
import { ErrorResponse } from "@/shared/api/types"

export const searchDebtorCandidates = createAsyncThunk<BaseDebtorApi[], SearchDebtorParams, { rejectValue: ErrorResponse }>(
  "debtors/candidates",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiDebtors.searchDebtors(params)
      return { ...data, ...params }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getDebtorsNew = createAsyncThunk<NewDebtorApi[], SearchNewDebtorParams, { rejectValue: ErrorResponse }>(
  "debtors/new",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiDebtors.getDebtorStageNew(params)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
