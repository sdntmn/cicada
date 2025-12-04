import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { SelectionTable } from "../SelectionTable/SelectionTable"
import { SwitchingSearch } from "../SwitchingSearch/SwitchingSearch"

import "./styles.scss"

export const SelectionPage: React.FC = () => (
  <Flex className="selection-page" vertical>
    <Flex className="selection-page__wrap">
      <SwitchingSearch />
    </Flex>
    <SelectionTable />
  </Flex>
)
