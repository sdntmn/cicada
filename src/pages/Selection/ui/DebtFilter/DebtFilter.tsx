import React from "react"

import { TextField, Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"
import { Slider } from "@/shared/ui/Slider"

import "./styles.scss"

export interface Props {
  id: string
  label: string
  max: number
  min: number
  onChangeSlider: (value: number) => void
  onChangeText: (value: string) => void
  placeholder?: string
  step: number
  title?: string
  value: string
}

export const DebtFilter: React.FC<Props> = ({
  id,
  label,
  max,
  min,
  onChangeSlider,
  onChangeText,
  placeholder,
  step,
  title,
  value,
}) => {
  const numValue = value === "" ? min : Number(value)
  const clampedValue = isNaN(numValue) ? min : Math.min(Math.max(numValue, min), max)

  return (
    <Flex className="debt-filter" gap={12} vertical>
      {title && <Typography.Text className="debt-filter__title">{title}</Typography.Text>}
      {label && <Typography.Text className="debt-filter__label">{label}</Typography.Text>}
      <Flex gap={16} vertical>
        <TextField id={id} name={id} onChange={onChangeText} placeholder={placeholder} value={value} />
        <Slider max={max} min={min} onChange={onChangeSlider} step={step} value={clampedValue} />
      </Flex>
    </Flex>
  )
}
