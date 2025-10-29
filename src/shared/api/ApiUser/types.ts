import { Email, Mobile } from "@/shared/lib/types/types"

export interface UserApi {
  email: Email | null
  first_name: string
  id: string
  last_name: string
  mobile: Mobile | null
  patronymicName: string
  username: string
}
