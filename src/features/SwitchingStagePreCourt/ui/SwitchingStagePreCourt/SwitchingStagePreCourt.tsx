import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { StageName } from "@/shared/constants"
import { TableStage } from "@/widgets/TableStage"

import "./styles.scss"

export const SwitchingStagePreCourt: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<StageName>(StageName.START)

  const items: TabsItem[] = [
    {
      content: <TableStage />,
      title: StageName.START,
    },
    {
      content: <TableStage />,
      title: StageName.END,
    },
  ]

  const handleTabChange = (tabTitle: StageName) => {
    setSelectedTab(tabTitle)
  }

  return <Tabs changeActiveTab={handleTabChange} items={items} />
}
