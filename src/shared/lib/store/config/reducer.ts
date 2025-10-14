import { combineReducers, type Reducer } from "redux"

import { accountsReducer } from "@/entities/Accounts"
import { userReducer } from "@/entities/User"

import { StorageSchema } from "./StorageSchema"

export const reducer: Reducer<StorageSchema> = combineReducers({
  accounts: accountsReducer,
  user: userReducer,
})
