import React from "react"

import { Flex, TextField } from "itpc-ui-kit"

import { Account } from "@/entities/Accounts"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface Props {
  buttonId: string
  columnName: keyof Account
  isOpen: boolean
  onClose: () => void
  onFilterChange: (column: keyof Account, value?: string) => void
}

export const FiltersColumn: React.FC<Props> = ({ buttonId, columnName, isOpen, onClose, onFilterChange }) => (
  <PositionPortal
    className="filters-column"
    componentId={buttonId}
    distanceBetweenElements={4}
    horizontalAlignment={HORIZONTAL_POSITION.CENTER}
    isOpen={isOpen}
    onClose={onClose}
  >
    <div className="filters-column__title">Фильтр: {String(columnName)}</div>
    <Flex vertical>
      <TextField id={""} name={""} />
    </Flex>
  </PositionPortal>
)
