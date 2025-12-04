import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { сhangeDebtStageToNew } from "@/features/ChangeDebtStage/model/thunk/thunk"
import { ErrorResponse } from "@/shared/api/types"

import { type Notification, type NotificationsStorage } from "../types/types"

const initialState: NotificationsStorage = {
  notifications: [],
}

export const notificationsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(сhangeDebtStageToNew.fulfilled, (state, action) => {
        notificationsSlice.caseReducers.add(state, {
          payload: {
            id: action.meta.requestId,
            text: `Перемещено ${action.payload.moved_count} должников в статус "${action.payload.to_stage}"`,
            title: "Переход на стадию",
            type: "success",
          },
          type: action.type,
        })
      })
      .addCase(сhangeDebtStageToNew.rejected, (state, action) => {
        const error = action.payload as ErrorResponse
        notificationsSlice.caseReducers.add(state, {
          payload: {
            id: action.meta.requestId,
            text: error?.message || "Не удалось перевести должников",
            title: "Ошибка перевода",
            type: "error",
          },
          type: action.type,
        })
      }),
  initialState,
  name: "notifications",
  reducers: {
    add: (state, action: PayloadAction<Notification>) => {
      state.notifications = [...state.notifications, action.payload]
    },
    delete: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { actions: notificationsActions, reducer: notificationsReducer } = notificationsSlice
