import React from "react"

import { Checkbox, Typography } from "itpc-ui-kit"

import { SearchMode } from "@/features/HouseMultiSelect/lib/types/types"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export interface SearchModeToggleProps {
  onChange: (mode: SearchMode) => void
  value: SearchMode
}

export const SearchModeSelector: React.FC<SearchModeToggleProps> = ({ onChange, value }) => (
  <Flex gap={8} vertical>
    <Typography.Text className="search-mode-selector__title">Как искать</Typography.Text>
    <Flex gap={24} role="radiogroup">
      <Checkbox
        id="search-any"
        isChecked={value === "any"}
        label="или"
        labelPosition="right"
        name="search-mode"
        onClick={() => onChange("any")}
        variant="round"
      />
      <Checkbox
        id="search-all"
        isChecked={value === "all"}
        label="и"
        labelPosition="right"
        name="search-mode"
        onClick={() => onChange("all")}
        variant="round"
      />
    </Flex>
  </Flex>
)
