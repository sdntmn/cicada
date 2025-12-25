import { NewDebtor } from "@/entities/Debtor"
import { DebtStage } from "@/shared/constants"

import type { BaseColumn, VirtualColumnAnalysisTableKey } from "../constants/keysColumns"

export interface InitialData extends NewDebtor {
  stage: DebtStage
}

export type ColumnAnalysisData = VirtualColumnAnalysisTableKey | BaseColumn

export interface CellInteractionState {
  activeCellKey: string | null
  currentCell: HTMLElement | null
  dataRow: InitialData | null
  isOpenViewInfoCell: boolean
}

export interface ModalState {
  editingData: InitialData | null
  isPanelOpen: boolean
  selectedDebtor: InitialData | null
}
