import { UserApi } from "@/shared/lib/api"

import { User } from "../../types/account"

export const convertUserApiToUser = ({ first_name, last_name, ...rest }: UserApi): User => ({
  ...rest,
  firstName: first_name,
  lastName: last_name,
})
