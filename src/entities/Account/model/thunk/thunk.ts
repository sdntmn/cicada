import { createAsyncThunk } from "@reduxjs/toolkit"

import { AccountsApi, apiAccounts } from "@/shared/api/AccountsApi"

export const getAccounts = createAsyncThunk<AccountsApi>("accounts/getAccounts", async (_, { rejectWithValue }) => {
  try {
    return await apiAccounts.getAccounts()
  } catch (e) {
    return rejectWithValue(e)
  }
})
