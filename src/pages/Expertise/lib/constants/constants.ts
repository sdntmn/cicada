import { BASE_COLUMNS } from "@/shared/constants/constants"

export const EXPERTISE_COLUMNS = {
  ...BASE_COLUMNS,
  CONCLUSION: "conclusion",
  END_DATE: "endDate",
  EXPERT_NAME: "expertName",
  START_DATE: "startDate",
  STATUS: "status",
} as const
