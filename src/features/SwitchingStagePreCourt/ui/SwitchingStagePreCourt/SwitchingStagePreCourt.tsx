import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { StageName } from "@/shared/constants"
import { Table } from "@/widgets/Table"

import "./styles.scss"

export const SwitchingStagePreCourt: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<StageName>(StageName.START)

  const items: TabsItem[] = [
    {
      content: <Table />,
      title: StageName.START,
    },
    {
      content: <Table />,
      title: StageName.END,
    },
  ]

  const handleTabChange = (tabTitle: StageName) => {
    setSelectedTab(tabTitle)
  }

  return <Tabs changeActiveTab={handleTabChange} className="switching-stage" items={items} />
}
