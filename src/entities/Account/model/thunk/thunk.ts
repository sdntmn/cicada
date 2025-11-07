import { createAsyncThunk } from "@reduxjs/toolkit"

import { AccountApi, apiAccounts, SearchAccountsParams } from "@/shared/api/AccountsApi"
import { ErrorResponse } from "@/shared/api/types"

export const getAccounts = createAsyncThunk<AccountApi[], void, { rejectValue: ErrorResponse }>(
  "accounts/getAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAccounts.getAccounts()
      return response
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const searchAccounts = createAsyncThunk<AccountApi[], SearchAccountsParams, { rejectValue: ErrorResponse }>(
  "accounts/searchAccounts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiAccounts.searchAccounts(params)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
