import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { SelectHouseStorage } from "../types/types"

const initialState: SelectHouseStorage = {
  error: null,
  isLoading: false,
  selectedHouseIds: [],
}

export const houseSelectionSlice = createSlice({
  extraReducers: () => {},
  initialState,
  name: "selectHouse",
  reducers: {
    clearHousesResults: (state) => {
      state.selectedHouseIds = []
      state.error = null
    },
    removeHouse: (state, action: PayloadAction<string>) => {
      if (state.selectedHouseIds.includes(action.payload)) {
        state.selectedHouseIds = state.selectedHouseIds.filter((id) => id !== action.payload)
      }
    },
    setSelectedHouseIds: (state, action: PayloadAction<string[]>) => {
      state.selectedHouseIds = action.payload
    },
  },
})

export const { actions: houseSelectionActions, reducer: houseSelectionReducer } = houseSelectionSlice
