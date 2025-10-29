import { User } from "@/entities/User"
import { UserApi } from "@/shared/api"

export const convertUserApiToUser = ({ first_name, last_name, ...rest }: UserApi): User => ({
  ...rest,
  firstName: first_name,
  lastName: last_name,
})
