// import React, { useState } from "react"

// import { Tabs, TabsItem } from "itpc-ui-kit"

// import { StageName } from "@/shared/constants"

// import { ClaimTable } from "../ClaimTable/ClaimTable"
// import { InitialDataTable } from "../DebtInitialization/DebtInitialization"

// import "./styles.scss"

// export const StageSwitcher: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<StageName>(StageName.ANALYSIS)

//   const items: TabsItem[] = [
//     {
//       content: <InitialDataTable />,
//       title: StageName.ANALYSIS,
//     },
//     {
//       content: <ClaimTable />,
//       title: StageName.CLAIM,
//     },
//     {
//       content: <div>Урегулирование</div>,
//       title: StageName.SETTLEMENT,
//     },
//     {
//       content: <div>ExpertiseSwitch</div>,
//       title: StageName.PRE_TRIAL,
//     },
//   ]

//   const handleTabChange = (tabTitle: StageName) => {
//     setSelectedTab(tabTitle)
//   }

//   return <Tabs changeActiveTab={handleTabChange} className="stage-switcher" items={items} />
// }
