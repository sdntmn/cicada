import { AccountsStorage } from "@/entities/Accounts"
import { UserStorage } from "@/entities/User"

export interface StorageSchema {
  accounts: AccountsStorage
  user: UserStorage
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StorageSchema
}
