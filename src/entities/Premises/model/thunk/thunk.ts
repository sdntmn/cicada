import { createAsyncThunk } from "@reduxjs/toolkit"

import { apiPremises, PremisesResponse } from "@/shared/api/PremisesApi"

export const getPremises = createAsyncThunk<PremisesResponse, void, { rejectValue: unknown }>(
  "premises/searchPremises",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiPremises.getPremises()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
