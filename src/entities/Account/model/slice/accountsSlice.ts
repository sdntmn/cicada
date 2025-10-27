import { createSlice } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"

import { getAccounts } from "../thunk/thunk"
import { Account, AccountsStorage } from "../types/account"

const transformRawAccount = (raw: any): Account => {
  const { city, house, street } = raw.address || {}

  const addressStr = [street, house].filter(Boolean).join(", ") || ""

  return {
    account: raw.accountNumber, // ← переименовываем accountNumber → account
    address: addressStr,
    city: city || "",
    debt: String(raw.debt), // или оставить как number, если в типе number
    fio: raw.fio,
    id: raw.id,
    judicialDistrict: raw.judicialDistrict, // если есть
    penalty: String(raw.penalty),
  }
}

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
        state.accounts = accounts.map(transformRawAccount)
        state.isLoading = false
      }),
  initialState,
  name: "user",
  reducers: {},
})

export const { actions: accountsActions, reducer: accountsReducer } = accountsSlice
