import React, { useState } from "react"

import { Tabs, TabsItem } from "itpc-ui-kit"

import { HouseMultiSelect } from "@/features/HouseMultiSelect"
import { SearchByAddress } from "@/features/SearchByAddress"
import { SelectedSearch } from "@/shared/constants"

import "./styles.scss"

export const SwitchingSearch: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedSearch>(SelectedSearch.LIST_HOUSES)

  const items: TabsItem[] = [
    {
      content: <HouseMultiSelect />,
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
