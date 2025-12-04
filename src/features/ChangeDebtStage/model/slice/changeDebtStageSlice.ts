import { createSlice } from "@reduxjs/toolkit"

import { DebtStageApi } from "@/shared/api/DebtStageApi/types"
import { ErrorResponse } from "@/shared/api/types"

import { transformMoveDebtStage } from "../service/transformData/transformData"
import { сhangeDebtStageToCandidates, сhangeDebtStageToNew } from "../thunk/thunk"
import { DebtStageStorage } from "../types/types"

const initialState: DebtStageStorage = {
  error: null,
  isLoading: false,
  moveDebtStage: null,
}

export const changeDebtStageSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(сhangeDebtStageToNew.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(сhangeDebtStageToNew.fulfilled, (state, action) => {
        state.moveDebtStage = transformMoveDebtStage(action.payload as DebtStageApi)
        state.isLoading = false
      })
      .addCase(сhangeDebtStageToNew.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ErrorResponse
      })
      .addCase(сhangeDebtStageToCandidates.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(сhangeDebtStageToCandidates.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(сhangeDebtStageToCandidates.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ErrorResponse
      })
  },
  initialState,
  name: "changeDebtStage",
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { actions: changeDebtStageActions, reducer: changeDebtStageReducer } = changeDebtStageSlice
