import React from "react"

import { ArchivePage } from "@/pages/Archive"
import { CourtPage } from "@/pages/Court"
import { DashboardPage } from "@/pages/Dashboard"
import { ExpertisePage } from "@/pages/Expertise"
import { MonitoringPage } from "@/pages/Monitoring"
import { SelectionPage } from "@/pages/Selection"
import { Menu } from "@/shared/constants"

export const sections: Record<Menu, () => React.ReactNode> = {
  [Menu.archive]: () => <ArchivePage />,
  [Menu.cardIndex]: () => <SelectionPage />,
  [Menu.court]: () => <CourtPage />,
  [Menu.dashboard]: () => <DashboardPage />,
  [Menu.expertise]: () => <ExpertisePage />,
  [Menu.monitoring]: () => <MonitoringPage />,
}
