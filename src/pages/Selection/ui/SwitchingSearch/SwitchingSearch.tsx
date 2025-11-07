import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { SearchByAddress } from "@/features/SearchByAddress"
import { SelectedSearch } from "@/shared/constants"

import { MultiSelectHouses } from "../MultiSelectHouses/MultiSelectHouses"

import "./styles.scss"

export const SwitchingSearch: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedSearch>(SelectedSearch.LIST_HOUSES)

  const items: TabsItem[] = [
    {
      content: <MultiSelectHouses />,
      title: SelectedSearch.LIST_HOUSES,
    },
    {
      content: <SearchByAddress />,
      title: SelectedSearch.ADDRESS,
    },
  ]

  const handleTabChange = (tabTitle: SelectedSearch) => {
    setSelectedTab(tabTitle)
  }

  return <Tabs changeActiveTab={handleTabChange} className="switching-search" items={items} />
}
