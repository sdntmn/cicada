import { UserApi } from "@/shared/api"

import { User } from "../../types/user"

export const convertUserApiToUser = ({ first_name, last_name, ...rest }: UserApi): User => ({
  ...rest,
  firstName: first_name,
  lastName: last_name,
})
