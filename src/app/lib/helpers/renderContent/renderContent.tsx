// app/lib/renderContent.tsx
import React from "react"

// === Standalone страницы ===
import { DashboardPage } from "@/pages/Dashboard"
// === Workspace'ы: Expertise ===

import { ArchivePage } from "@/pages/Archive"
import { DebtorsPage } from "@/pages/Debtors"
import { MonitoringPage } from "@/pages/Monitoring"
import { DebtInitialization } from "@/pages/PreparationAnalysis"
import { PreparationClaimPage } from "@/pages/PreparationClaim"
import { SelectionPage } from "@/pages/Selection"
import { Menu } from "@/shared/constants"
import type { AnySubSection, NavigationTarget } from "@/shared/lib/types/navigation"

// === Тип пропсов ===
export interface RenderContentProps {
  caseId?: string
  onNavigateToItem: (target: NavigationTarget) => void
  section: Menu
  subSection?: AnySubSection
}

// === Основная функция ===
export const renderContent = ({ caseId, onNavigateToItem, section, subSection }: RenderContentProps): React.ReactNode => {
  // 🔹 Детальная страница дела: /case/123
  if (section === Menu.caseDetail) {
    if (!caseId) {
      return <div>Не указан ID дела</div>
    }
    return <div> Пока пусто</div>
  }

  // 🔹 Standalone страницы (без подсекций)
  if (section === Menu.dashboard) {
    return <DashboardPage />
  }
  if (section === Menu.selection) {
    return <SelectionPage />
  }
  if (section === Menu.monitoring) {
    return <MonitoringPage />
  }
  if (section === Menu.archive) {
    return <ArchivePage />
  }
  if (section === Menu.debtors) {
    return <DebtorsPage />
  }

  // 🔹 Expertise: /preparation/analysis, /preparation/claim, ...
  if (section === Menu.preparation) {
    switch (subSection) {
      case "analysis":
        return <DebtInitialization currentSubSection={subSection} onNavigateToItem={onNavigateToItem} />
      case "claim":
        return <PreparationClaimPage />
      case "settlement":
        return <div> Пока пусто</div>
      case "courtPreparation":
        return <div> Пока пусто</div>
      default:
        return <DebtInitialization currentSubSection={subSection} onNavigateToItem={onNavigateToItem} />
    }
  }

  // 🔹 Court: /court/cases, /court/documents, ...
  if (section === Menu.court) {
    switch (subSection) {
      case "documents":
        return <div> Пока пусто</div>
      case "hearings":
        return <div> Пока пусто</div>
      case "judges":
        return <div> Пока пусто</div>
      default:
        return <div> Пока пусто</div>
    }
  }

  // 🔹 Fallback
  return <DashboardPage />
}
