import { NewDebtor } from "@/entities/Debtor"
import { DebtStage } from "@/shared/constants"

import type { BaseColumnInitialDataTableKey, VirtualColumnInitialDataTableKey } from "../constants/columnKeysInitialData"

export interface InitialData extends NewDebtor {
  stage: DebtStage
}

export type ColumnInitialData = VirtualColumnInitialDataTableKey | BaseColumnInitialDataTableKey

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
