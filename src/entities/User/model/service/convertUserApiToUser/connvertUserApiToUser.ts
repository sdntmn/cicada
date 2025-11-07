import { UserApi } from "@/shared/api"
import { Email } from "@/shared/lib/types/types"

import { User } from "../../types/user"

export const convertUserApiToUser = (source: UserApi): User => {
  const settings = source.json_settings || {}

  return {
    email: source.email as Email | null,
    firstName: "",
    id: source.id,
    lastName: "",
    mobile: null,
    patronymicName: "",
    settings,
    username: source.user_name,
  }
}
