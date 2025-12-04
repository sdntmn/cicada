import { DebtorStorage } from "@/entities/Debtor"
import { PremisesStorage } from "@/entities/Premises"
import { UserStorage } from "@/entities/User"
import { DebtStageStorage } from "@/features/ChangeDebtStage"
import { SelectHouseStorage } from "@/features/HouseMultiSelect"
import { NotificationsStorage } from "@/widgets/Notifications"

export interface StorageSchema {
  changeStage: DebtStageStorage
  debtors: DebtorStorage
  houseSelection: SelectHouseStorage
  notifications: NotificationsStorage
  premises: PremisesStorage
  user: UserStorage
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StorageSchema
}
