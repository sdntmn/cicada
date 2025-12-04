// app/lib/hooks/useAppNavigation.ts
import { useCallback, useEffect, useState } from "react"

import { DetailType, Menu, ViewType } from "@/shared/constants"
import {
  getCaseIdFromUrl,
  getInitialSubSection,
  getOriginSectionFromUrl,
  getOriginSubSectionFromUrl,
  getSectionFromUrl,
  hasSubSections,
  isValidSubSection,
  updateUrl,
} from "@/shared/lib/helpers"
import type { AnySubSection, AppView, NavigationTarget } from "@/shared/lib/types/navigation"

export const useAppNavigation = () => {
  // === Инициализация ===
  const getInitialView = (): AppView => {
    const initSection = getSectionFromUrl()
    const initCaseId = getCaseIdFromUrl()

    const originSection = getOriginSectionFromUrl()
    const originSubSection = getOriginSubSectionFromUrl()

    if (initSection === Menu.caseDetail && initCaseId) {
      return {
        caseId: initCaseId,
        detailType: DetailType.CASE,
        originSection: originSection || Menu.preparation,
        originSubSection: (originSubSection as AnySubSection) || "analysis",
        type: ViewType.DETAIL,
      }
    }

    const initSubSection = initSection !== Menu.caseDetail ? getInitialSubSection(initSection) : undefined

    return {
      caseId: initCaseId,
      section: initSection,
      subSection: initSubSection,
      type: ViewType.MAIN,
    }
  }

  const [currentView, setCurrentView] = useState<AppView>(getInitialView())

  // === Обработка навигации назад ===
  useEffect(() => {
    const handlePopState = () => {
      const section = getSectionFromUrl()
      const caseId = getSectionFromUrl() === Menu.caseDetail ? getCaseIdFromUrl() : null
      const subSection = section !== Menu.caseDetail ? getInitialSubSection(section) : undefined
      setCurrentView({
        caseId: caseId || undefined,
        section,
        subSection,
        type: ViewType.MAIN,
      })
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // === Переключение основного раздела ===
  const switchSection = useCallback((section: Menu) => {
    const subSection = hasSubSections(section) ? getInitialSubSection(section) : undefined
    setCurrentView({
      section,
      subSection,
      type: ViewType.MAIN,
    })
    updateUrl(section, subSection)
  }, [])

  // === Переключение подсекции ===
  const switchSubSection = useCallback(
    (subSection: string) => {
      if (currentView.type === ViewType.MAIN) {
        if (!isValidSubSection(currentView.section, subSection)) {
          console.warn("Невалидная подсекция:", subSection)
          return
        }
      }

      setCurrentView((prev) => {
        if (prev.type !== ViewType.MAIN) {
          return prev
        }
        return {
          ...prev,
          caseId: undefined,
          subSection: subSection as AnySubSection,
        }
      })

      if (currentView.type === ViewType.MAIN) {
        updateUrl(currentView.section, subSection)
      }
    },
    [currentView]
  )

  // === Навигация к деталям или другим разделам ===
  const navigateToItem = useCallback(
    (target: NavigationTarget) => {
      const { caseId, debtorId, detailType, originSection, originSubSection } = target

      if (detailType) {
        const resolvedOriginSection = originSection || (currentView.type === ViewType.MAIN ? currentView.section : Menu.preparation)

        let resolvedOriginSubSection = originSubSection
        if (!resolvedOriginSubSection && currentView.type === ViewType.MAIN) {
          resolvedOriginSubSection = currentView.subSection
        }
        if (!resolvedOriginSubSection) {
          resolvedOriginSubSection = "analysis" as AnySubSection
        }

        const view: AppView = {
          caseId,
          debtorId,
          detailType,
          originSection: resolvedOriginSection,
          originSubSection: resolvedOriginSubSection,
          type: ViewType.DETAIL,
        }
        setCurrentView(view)

        if (detailType === DetailType.CASE && caseId) {
          updateUrl(
            Menu.caseDetail,
            undefined,
            caseId,
            undefined,
            resolvedOriginSection, // ← originSection
            resolvedOriginSubSection // ← originSubSection
          )
        } else if (detailType === DetailType.DEBTOR && debtorId) {
          updateUrl(Menu.debtorDetail, undefined, undefined, debtorId)
        }
        return
      }

      if (target.section) {
        const resolvedSub = hasSubSections(target.section) ? target.subSection || getInitialSubSection(target.section) : undefined
        setCurrentView({
          section: target.section,
          subSection: resolvedSub,
          type: ViewType.MAIN,
        })
        updateUrl(target.section, resolvedSub)
      }
    },
    [currentView]
  )

  // === Вычисляем активный пункт основного меню ===
  const activeMainMenuSection = currentView.type === ViewType.DETAIL ? currentView.originSection : currentView.section

  return {
    activeMainMenuSection,
    currentView,
    navigateToItem,
    switchSection,
    switchSubSection,
  }
}
