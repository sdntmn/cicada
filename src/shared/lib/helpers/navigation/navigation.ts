import { Menu } from "@/shared/constants"
import { SUB_SECTION_TITLES, SUB_SECTIONS_MAP } from "@/shared/constants/constants"

import type { AnySubSection } from "../../types/navigation"

const BASE_PATH = "/cicada"

const buildUrl = (path: string): string => BASE_PATH + path

export const hasSubSections = (section: Menu): boolean => SUB_SECTIONS_MAP[section].length > 0

export const isValidSubSection = (section: Menu, subSection: string): boolean =>
  (SUB_SECTIONS_MAP[section] as readonly string[]).includes(subSection)

export const getDefaultSubSection = (section: Menu): AnySubSection | undefined => {
  const valid = SUB_SECTIONS_MAP[section]
  return valid.length > 0 ? valid[0] : undefined
}

export const getSubMenu = (section: Menu) => {
  const ids = SUB_SECTIONS_MAP[section]
  if (ids.length === 0) {
    return null
  }
  return ids.map((id) => ({
    id,
    title: SUB_SECTION_TITLES[id] || id,
  }))
}

const stripBasePath = (path: string): string => {
  if (path.startsWith(BASE_PATH + "/")) {
    return path.slice(BASE_PATH.length)
  }
  if (path === BASE_PATH) {
    return "/"
  }
  return path
}

// === URL PARSING ===

export const getSectionFromUrl = (): Menu => {
  if (typeof window === "undefined") {
    return Menu.dashboard
  }

  const path = stripBasePath(window.location.pathname)

  if (path.startsWith("/case/")) {
    return Menu.caseDetail
  }
  if (path.startsWith("/court")) {
    return Menu.court
  }
  if (path.startsWith("/preparation")) {
    return Menu.preparation
  }
  if (path.startsWith("/monitoring")) {
    return Menu.monitoring
  }
  if (path.startsWith("/archive")) {
    return Menu.archive
  }
  if (path.startsWith("/selection")) {
    return Menu.selection
  }

  return Menu.dashboard
}

export const getCaseIdFromUrl = (): string | null => {
  const path = stripBasePath(window.location.pathname)
  if (path.startsWith("/case/")) {
    return path.split("/")[2] || null
  }
  return null
}

export const getSubSectionFromUrl = (section: Menu): AnySubSection | undefined => {
  if (typeof window === "undefined") {
    return undefined
  }
  if (!hasSubSections(section)) {
    return undefined
  }

  const prefix = `/${section}`
  const path = window.location.pathname

  if (!path.startsWith(prefix)) {
    return undefined
  }

  const rest = path.slice(prefix.length).replace(/^\/+/, "")
  const firstSegment = rest.split("/")[0]

  // ✅ Проверяем валидность и возвращаем типизированное значение
  if (isValidSubSection(section, firstSegment)) {
    return firstSegment as AnySubSection
  }
  return undefined
}

export const getInitialSubSection = (section: Menu): AnySubSection | undefined => {
  if (!hasSubSections(section)) {
    return undefined
  }
  return getSubSectionFromUrl(section) || getDefaultSubSection(section)
}

// === NAVIGATION ===

export const updateUrl = (
  section: Menu,
  subSection?: string,
  caseId?: string,
  debtorId?: string,
  originSection?: Menu, // ← новые параметры
  originSubSection?: string
) => {
  if (typeof window === "undefined") {
    return
  }

  // 🔹 Детальная страница дела
  if (section === Menu.caseDetail && caseId) {
    let url = `/case/${caseId}`
    const params = new URLSearchParams()
    if (originSection) {
      params.set("from", originSection)
    }
    if (originSubSection) {
      params.set("sub", originSubSection)
    }
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    window.history.pushState({}, "", buildUrl(url)) // ← используем buildUrl
    return
  }

  // 🔹 Детальная страница должника
  if (section === Menu.debtorDetail && debtorId) {
    let url = `/debtor/${debtorId}`
    const params = new URLSearchParams()
    if (originSection) {
      params.set("from", originSection)
    }
    if (originSubSection) {
      params.set("sub", originSubSection)
    }
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    window.history.pushState({}, "", buildUrl(url))
    return
  }

  // 🔹 Обычные разделы
  let url = `/${section}`
  if (hasSubSections(section) && subSection && isValidSubSection(section, subSection)) {
    url += `/${subSection}`
  }
  window.history.pushState({}, "", buildUrl(url))
}

// navigationHelpers.ts
export const getOriginSectionFromUrl = (): Menu | null => {
  if (typeof window === "undefined") {
    return null
  }
  const params = new URLSearchParams(window.location.search)
  const from = params.get("from")
  if (from && Object.values(Menu).includes(from as Menu)) {
    return from as Menu
  }
  return null
}

export const getOriginSubSectionFromUrl = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }
  const params = new URLSearchParams(window.location.search)
  return params.get("sub")
}
