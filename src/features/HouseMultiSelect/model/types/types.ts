import { ErrorResponse } from "@/shared/api/types"

export interface SelectHouseStorage {
  error: ErrorResponse
  isLoading: boolean
  selectedHouseIds: string[]
}
