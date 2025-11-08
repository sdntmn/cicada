import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"
import { PageSize } from "@/shared/lib/types/types"

import { transformRawAccount } from "../service/transformRawAccount/transformRawAccount"
import { getAccounts, searchAccounts } from "../thunk/thunk"
import { AccountsStorage, SearchParams } from "../types/account"

const initialState: AccountsStorage = {
  accounts: [],
  errorResponse: null,
  isLoading: false,
  page: 0,
  pageSize: 20,
  rowIndex: 0,
  searchParams: {},
  total: 0,
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
        const { data, page, pageSize, total } = action.payload as any
        state.accounts = data.map(transformRawAccount)
        state.total = total
        state.page = page
        state.pageSize = pageSize
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageSize: (state, action: PayloadAction<PageSize>) => {
      state.pageSize = action.payload
      state.page = 0 // сброс на первую страницу при смене размера
    },
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload
    },
    updateSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload
    },
  },
})

export const { actions: accountsActions, reducer: accountsReducer } = accountsSlice
