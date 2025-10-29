import React, { useEffect, useState } from "react"

import { TextField } from "itpc-ui-kit"

import { Account } from "@/entities/Account"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface Props {
  buttonId: string
  columnName: keyof Account
  currentValue?: string
  isOpen: boolean
  onClose: () => void
  onFilterChange: (column: keyof Account, value?: string) => void
}

export const FiltersColumn: React.FC<Props> = ({ buttonId, columnName, currentValue = "", isOpen, onClose, onFilterChange }) => {
  const [inputValue, setInputValue] = useState(currentValue)

  const handleChange = (value: string) => {
    setInputValue(value)
    onFilterChange(columnName, value || undefined)
  }

  useEffect(() => {
    setInputValue(currentValue)
  }, [currentValue])

  return (
    <PositionPortal
      className="filters-column"
      componentId={buttonId}
      distanceBetweenElements={4}
      horizontalAlignment={HORIZONTAL_POSITION.CENTER}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex vertical>
        <TextField
          id={`id-filter-${String(columnName)}`}
          name={`name-filter-${String(columnName)}`}
          onChange={handleChange}
          value={inputValue}
        />
      </Flex>
    </PositionPortal>
  )
}
