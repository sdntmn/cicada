import { ErrorResponse } from "@/shared/api/types"

export interface PremisesItem {
  apartment?: string
  city: string
  house: string
  houseId: string
  id: string
  judicial: string
  street: string
}

export interface PremisesStorage {
  error: ErrorResponse
  isLoading: boolean
  premises: PremisesItem[]
}
