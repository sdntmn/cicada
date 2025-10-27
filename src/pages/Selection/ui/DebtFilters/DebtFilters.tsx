import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

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
}) => {
  const SUM_MIN = 0
  const SUM_MAX = 10_000
  const TERM_MIN = 0
  const TERM_MAX = 36

  return (
    <Flex gap={12} vertical>
      <Typography.Text className="debt-filters__title">Задолженность более</Typography.Text>
      <Flex gap={32} vertical>
        <DebtFilter
          id="sum"
          label="Сумма / руб."
          max={SUM_MAX}
          min={SUM_MIN}
          onChangeSlider={onChangeSumSlider}
          onChangeText={onChangeSum}
          step={100}
          value={sumValue}
        />

        <DebtFilter
          id="term"
          label="Срок / мес."
          max={TERM_MAX}
          min={TERM_MIN}
          onChangeSlider={onChangeTermSlider}
          onChangeText={onChangeTerm}
          step={1}
          value={termValue}
        />
      </Flex>
    </Flex>
  )
}
