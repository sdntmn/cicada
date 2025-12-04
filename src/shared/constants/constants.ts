import type { SubSectionId } from "../lib/types/navigation"
import { FontSize } from "../lib/types/types"

import { Menu, RowDensity } from "./enums"

export const BASE_COLUMNS = {
  ACCOUNT: "account",
  ADDRESS: "address",
  CITY: "city",
  DEBT: "debt",
  FIO: "fio",
  PENALTY: "penalty",
} as const

export const DENSITY_DISPLAY_ORDER: RowDensity[] = [RowDensity.SMALL, RowDensity.MEDIUM, RowDensity.LARGE, RowDensity.X_LARGE]

export const FONT_SIZE_DISPLAY_ORDER: FontSize[] = ["small", "normal", "large", "xlarge"]

export const FONT_SIZE_LABELS: Record<FontSize, string> = {
  large: "Крупный",
  normal: "Обычный",
  small: "Мелкий",
  xlarge: "Очень крупный",
}

export const SUB_SECTIONS_MAP = {
  [Menu.archive]: [],
  [Menu.case]: [],
  [Menu.caseDetail]: [],
  [Menu.court]: ["cases", "documents", "hearings", "judges"],
  [Menu.dashboard]: [],
  [Menu.debtorDetail]: [],
  [Menu.debtors]: [],
  [Menu.monitoring]: [],
  [Menu.preparation]: ["analysis", "claim", "settlement", "courtPreparation"],
  [Menu.selection]: [],
} as const satisfies Record<Menu, readonly SubSectionId[]>

export const SUB_SECTION_TITLES = {
  analysis: "Анализ и сбор данных",
  cases: "Дела",
  claim: "Претензия",
  courtPreparation: "Подготовка к суду",
  documents: "Документы",
  hearings: "Заседания",
  judges: "Судьи",
  settlement: "Урегулирование",
} as const satisfies Record<SubSectionId, string>
