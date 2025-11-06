import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import { STEP, SUM, TERM } from "../../lib/constants"
import { DebtFilter } from "../DebtFilter/DebtFilter"

import "./styles.scss"

interface Props {
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  sumValue: string
  termValue: string
}

export const DebtFilters: React.FC<Props> = ({
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  sumValue,
  termValue,
}) => (
  <Flex gap={12} vertical>
    <Typography.Text className="debt-filters__title">Задолженность более</Typography.Text>
    <Flex gap={32} vertical>
      <DebtFilter
        id="sum"
        label="Сумма / руб."
        max={SUM.MAX}
        min={SUM.MIN}
        onChangeSlider={onChangeSumSlider}
        onChangeText={onChangeSum}
        step={STEP.SUM}
        value={sumValue}
      />

      <DebtFilter
        id="term"
        label="Срок / мес."
        max={TERM.MAX}
        min={TERM.MIN}
        onChangeSlider={onChangeTermSlider}
        onChangeText={onChangeTerm}
        step={STEP.TERM}
        value={termValue}
      />
    </Flex>
  </Flex>
)
