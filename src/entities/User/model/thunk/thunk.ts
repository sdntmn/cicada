import { createAsyncThunk } from "@reduxjs/toolkit"

import { apiUser, UserApi } from "@/shared/lib/api"

export const getUser = createAsyncThunk<UserApi, string>("user/getUser", async (account: string, { rejectWithValue }) => {
  try {
    return await apiUser.getUser(account)
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getAccounts = createAsyncThunk<UserApi, string>("accounts/getAccounts", async (account: string, { rejectWithValue }) => {
  try {
    return await apiUser.getUser(account)
  } catch (e) {
    return rejectWithValue(e)
  }
})
