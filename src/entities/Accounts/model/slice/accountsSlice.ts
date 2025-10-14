import { createSlice } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/lib/api/types"

import { getAccounts } from "../thunk/thunk"
import { Account, AccountsStorage } from "../types/accounts"

const initialState: AccountsStorage = {
  accounts: [],
  errorResponse: null,
  isLoading: false,
}

export const accountsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false
        state.errorResponse = action.payload as ErrorResponse
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        const accounts = action.payload as unknown as Account[]
        state.accounts = accounts
        state.isLoading = false
      }),
  initialState,
  name: "user",
  reducers: {},
})

export const { actions: accountsActions, reducer: accountsReducer } = accountsSlice
