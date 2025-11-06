import { EXPERTISE_COLUMNS } from "../constants/constants"

export interface StartExpertise {
  expertName: string
  id: string
  startDate: string
  status: string
  // ... другие поля
}

export type ExpertiseColumnTable = (typeof EXPERTISE_COLUMNS)[keyof typeof EXPERTISE_COLUMNS]
