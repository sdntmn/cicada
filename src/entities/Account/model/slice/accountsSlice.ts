import { createSlice } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"

import { transformRawAccount } from "../service/transformRawAccount/transformRawAccount"
import { getAccounts, searchAccounts } from "../thunk/thunk"
import { AccountsStorage } from "../types/account"

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
        const accounts = action.payload
        state.accounts = accounts.map(transformRawAccount)
        state.isLoading = false
      })
      .addCase(searchAccounts.pending, (state) => {
        state.isLoading = true
        state.errorResponse = null
      })
      .addCase(searchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload.map(transformRawAccount)
        state.isLoading = false
      })
      .addCase(searchAccounts.rejected, (state, action) => {
        state.isLoading = false
        state.errorResponse = action.payload
      }),
  initialState,
  name: "accounts",
  reducers: {
    clearSearchedAccounts: (state) => {
      state.accounts = []
      state.errorResponse = null
    },
  },
})

export const { actions: accountsActions, reducer: accountsReducer } = accountsSlice
