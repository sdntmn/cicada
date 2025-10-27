import { createSlice } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"

import { getHouses } from "../thunk/thunk"
import { HouseStorage } from "../types/types"

const initialState: HouseStorage = {
  error: null,
  houses: [],
  isLoading: false,
}

export const houseSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getHouses.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getHouses.fulfilled, (state, action) => {
        state.isLoading = false
        state.houses = action.payload
      })
      .addCase(getHouses.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ErrorResponse
      })
  },
  initialState,
  name: "house",
  reducers: {},
})

export const { actions: houseActions, reducer: houseReducer } = houseSlice
