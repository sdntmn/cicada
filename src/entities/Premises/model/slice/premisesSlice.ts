import { createSlice } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"

import { getPremises } from "../thunk/thunk"
import { PremisesStorage } from "../types/types"

const initialState: PremisesStorage = {
  error: null,
  isLoading: false,
  premises: [],
}

export const premisesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getPremises.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getPremises.fulfilled, (state, action) => {
        state.isLoading = false
        state.premises = action.payload
      })
      .addCase(getPremises.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ErrorResponse
      })
  },
  initialState,
  name: "house",
  reducers: {},
})

export const { actions: premisesActions, reducer: premisesReducer } = premisesSlice
