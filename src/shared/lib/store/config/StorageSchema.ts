import { AccountsStorage } from "@/entities/Account"
import { HouseStorage } from "@/entities/House"
import { UserStorage } from "@/entities/User"
import { SelectHouseStorage } from "@/features/HouseMultiSelect"

export interface StorageSchema {
  accounts: AccountsStorage
  house: HouseStorage
  houseSelection: SelectHouseStorage
  user: UserStorage
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StorageSchema
}
