import { createAsyncThunk } from "@reduxjs/toolkit"

import { apiHouses, HousesResponse } from "@/shared/api/HousesApi"

export const getHouses = createAsyncThunk<HousesResponse, void, { rejectValue: unknown }>(
  "houses/searchHouses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiHouses.getHouses()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
