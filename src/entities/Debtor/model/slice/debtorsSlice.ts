import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ErrorResponse } from "@/shared/api/types"
import { PageSize } from "@/shared/lib/types/types"

import { transformBaseDebtor, transformNewDebtor } from "../service/transformRawAccount/transformRawAccount"
import { getDebtorsNew, searchDebtorCandidates } from "../thunk/thunk"
import { DebtorStorage, SearchParams } from "../types/debtor"

const initialState: DebtorStorage = {
  debtors: [],
  errorResponse: null,
  isLoading: false,
  page: 0,
  pageSize: 20,
  rowIndex: 0,
  searchParams: {},
  total: 0,
}

export const debtorsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(searchDebtorCandidates.pending, (state) => {
        state.debtors = []
        state.isLoading = true
        state.errorResponse = null
      })
      .addCase(searchDebtorCandidates.fulfilled, (state, action) => {
        const { data, page, pageSize, total } = action.payload as any
        state.debtors = data.map(transformBaseDebtor)
        state.total = total
        state.page = page
        state.pageSize = pageSize
        state.isLoading = false
      })
      .addCase(searchDebtorCandidates.rejected, (state, action) => {
        state.isLoading = false
        state.errorResponse = action.payload as ErrorResponse
      })
      .addCase(getDebtorsNew.pending, (state) => {
        state.debtors = []
        state.isLoading = true
        state.errorResponse = null
      })
      .addCase(getDebtorsNew.fulfilled, (state, action) => {
        const { data, page, pageSize, total } = action.payload as any
        state.debtors = data.map(transformNewDebtor)
        state.total = total
        state.page = page
        state.pageSize = pageSize
        state.isLoading = false
      })
      .addCase(getDebtorsNew.rejected, (state, action) => {
        state.isLoading = false
        state.errorResponse = action.payload as ErrorResponse
      }),
  initialState,
  name: "debtors",
  reducers: {
    clearDebtorsState: (state) => {
      state.debtors = []
      state.page = 0
      state.pageSize = 20
      state.total = 0
      state.searchParams = {}
      state.errorResponse = null
    },
    clearSearchedAccounts: (state) => {
      state.debtors = []
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

export const { actions: debtorsActions, reducer: debtorsReducer } = debtorsSlice
