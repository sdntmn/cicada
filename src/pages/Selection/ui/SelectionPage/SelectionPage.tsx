import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { SelectionTable } from "../SelectionTable/SelectionTable"
import { SwitchingSearch } from "../SwitchingSearch/SwitchingSearch"

import "./styles.scss"

export const SelectionPage: React.FC = () => (
  <Flex className="selection-page" gap={8} vertical>
    <Flex className="selection-page__wrap" gap={32}>
      <SwitchingSearch />
    </Flex>
    <SelectionTable />
  </Flex>
)
