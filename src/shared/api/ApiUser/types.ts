import { Email } from "@/shared/lib/types/types"

export interface UserProfileSettings {
  notifications?: boolean
  theme?: "light" | "dark"
}

export interface UserApi {
  avatar: string | null
  created_at: string
  email: Email | null
  id: string
  json_settings: Partial<UserProfileSettings>
  updated_at: string
  user_name: string
}
