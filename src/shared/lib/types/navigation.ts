import { DetailType, Menu, type SUB_SECTIONS_MAP, ViewType } from "@/shared/constants"

export interface NavigationTarget {
  caseId?: string
  debtorId?: string
  detailType?: DetailType
  originSection?: Menu
  originSubSection?: AnySubSection
  section?: Menu
  subSection?: AnySubSection
}

export type AnySubSection = "courtPreparation" | "settlement" | "documents" | "analysis" | "hearings" | "judges" | "claim" | "cases"

export type SubSection = (typeof SUB_SECTIONS_MAP)[keyof typeof SUB_SECTIONS_MAP][number]

export type SubSectionId = "courtPreparation" | "settlement" | "documents" | "analysis" | "hearings" | "judges" | "claim" | "cases"

export type SubSectionsFor<T extends Menu> = (typeof SUB_SECTIONS_MAP)[T][number]

export type AppView =
  | {
      caseId?: string
      debtorId?: string
      detailType: DetailType
      originSection: Menu
      originSubSection?: AnySubSection
      type: ViewType.DETAIL
    }
  | {
      caseId?: string
      section: Menu
      subSection?: AnySubSection
      type: ViewType.MAIN
    }
