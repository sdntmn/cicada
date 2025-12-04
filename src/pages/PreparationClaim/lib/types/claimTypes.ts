import { NewDebtor } from "@/entities/Debtor"
import { DebtStage } from "@/shared/constants"

import { BaseColumn, VirtualColumnClaimTable } from "../constants"

export interface Claim extends NewDebtor {
  stage: DebtStage
}

export type ColumnClaim = VirtualColumnClaimTable | BaseColumn
