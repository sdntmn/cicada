import { combineReducers, type Reducer } from "redux"

import { accountsReducer } from "@/entities/Account"
import { houseReducer } from "@/entities/House"
import { userReducer } from "@/entities/User"
import { houseSelectionReducer } from "@/features/HouseMultiSelect"

import { StorageSchema } from "./StorageSchema"

export const reducer: Reducer<StorageSchema> = combineReducers({
  accounts: accountsReducer,
  house: houseReducer,
  houseSelection: houseSelectionReducer,
  user: userReducer,
})
