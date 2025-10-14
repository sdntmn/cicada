import { store } from "../config/store"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type RootStore = typeof store
