import { ErrorResponse } from "@/shared/api/types"

export interface HouseItem {
  apartment?: string
  city: string
  house: string
  houseId: string
  id: string
  judicial: string
  street: string
}

export interface HouseStorage {
  error: ErrorResponse
  houses: HouseItem[]
  isLoading: boolean
}
