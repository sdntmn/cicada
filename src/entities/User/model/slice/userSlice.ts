import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { UserApi } from "@/shared/api"
import { ErrorResponse } from "@/shared/api/types"

import { convertUserApiToUser } from "../service/convertUserApiToUser/connvertUserApiToUser"
import { getUser } from "../thunk/thunk"
import { UserStorage } from "../types/user"

const initialState: UserStorage = {
  errorResponse: null,
  isLoading: false,
  user: {
    email: null,
    firstName: "",
    id: "",
    lastName: "",
    mobile: null,
    patronymicName: "",
    settings: {},
    username: "",
  },
}

export const userSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.errorResponse = action.payload as ErrorResponse
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserApi>) => {
        const user = convertUserApiToUser(action.payload)

        state.user = user
        state.isLoading = false
      }),
  initialState,
  name: "user",
  reducers: {},
})

export const { actions: userActions, reducer: userReducer } = userSlice
