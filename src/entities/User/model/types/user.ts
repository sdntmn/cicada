import { ErrorResponse } from "@/shared/api/types"
import { Email, Mobile } from "@/shared/lib/types/types"

export interface User {
  email: Email | null
  firstName: string
  id: string
  lastName: string
  mobile: Mobile | null
  patronymicName: string
  username: string
}

export interface UserStorage {
  errorResponse: ErrorResponse
  isLoading: boolean
  user?: User
}
