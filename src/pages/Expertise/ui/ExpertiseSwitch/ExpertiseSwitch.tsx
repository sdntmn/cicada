import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { StageName } from "@/shared/constants"

import "./styles.scss"

export const ExpertiseSwitch: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<StageName>(StageName.START)

  const items: TabsItem[] = [
    {
      content: <div>ExpertiseSwitch</div>,
      title: StageName.START,
    },
    {
      content: <div>ExpertiseSwitch</div>,
      title: StageName.END,
    },
  ]

  const handleTabChange = (tabTitle: StageName) => {
    setSelectedTab(tabTitle)
  }

  return <Tabs changeActiveTab={handleTabChange} className="switching-stage" items={items} />
}
