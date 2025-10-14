import { configureStore } from "@reduxjs/toolkit"

import { logger } from "../middlewares"

import { reducer } from "./reducer"
import type { StorageSchema } from "./StorageSchema"

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([logger]),
  reducer,
})

export const createStore = (preloadedState: StorageSchema) =>
  configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([logger]),
    preloadedState,
    reducer,
  })
