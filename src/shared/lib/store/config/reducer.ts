import { combineReducers, type Reducer } from "redux"

import { debtorsReducer } from "@/entities/Debtor"
import { premisesReducer } from "@/entities/Premises"
import { userReducer } from "@/entities/User"
import { changeDebtStageReducer } from "@/features/ChangeDebtStage"
import { houseSelectionReducer } from "@/features/HouseMultiSelect"
import { notificationsReducer } from "@/widgets/Notifications"

import { StorageSchema } from "./StorageSchema"

export const reducer: Reducer<StorageSchema> = combineReducers({
  changeStage: changeDebtStageReducer,
  debtors: debtorsReducer,
  houseSelection: houseSelectionReducer,
  notifications: notificationsReducer,
  premises: premisesReducer,
  user: userReducer,
})
