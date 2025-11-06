import React from "react"

import { Checkbox, Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import { FilterMode } from "../../lib/constants/enum"

import "./styles.scss"

export interface Props {
  onChange: (mode: FilterMode) => void
  value: FilterMode
}

export const FilterLogicSwitch: React.FC<Props> = ({ onChange, value }) => (
  <Flex gap={8} vertical>
    <Typography.Text className="filter-logic-switch__title">Как искать</Typography.Text>
    <Flex gap={24} role="radiogroup">
      <Checkbox
        id="filter-any"
        isChecked={value === FilterMode.ANY}
        label="или"
        labelPosition="right"
        name="filter-mode"
        onClick={() => onChange(FilterMode.ANY)}
        variant="round"
      />
      <Checkbox
        id="filter-all"
        isChecked={value === FilterMode.ALL}
        label="и"
        labelPosition="right"
        name="filter-mode"
        onClick={() => onChange(FilterMode.ALL)}
        variant="round"
      />
    </Flex>
  </Flex>
)
