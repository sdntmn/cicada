import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { SearchByAddress } from "@/entities/SearchByAddress"
import { SearchByListHouses } from "@/entities/SearchByListHouses"
import { SelectedSearch } from "@/shared/constants"

import "./styles.scss"

export const SwitchingSearch: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedSearch>(SelectedSearch.LIST_HOUSES)

  const items: TabsItem[] = [
    {
      content: <SearchByListHouses />,
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
