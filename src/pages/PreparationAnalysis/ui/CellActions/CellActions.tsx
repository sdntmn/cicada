import React from "react"

import cn from "classnames"

import { eyeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/analysisTypes"

import "./styles.scss"

interface ActionCellProps {
  onViewCase?: (rowData: InitialData) => void
  rowData: InitialData
}

export const CellActions: React.FC<ActionCellProps> = ({ onViewCase, rowData }) => {
  const handleClick = () => {
    onViewCase?.(rowData) // ← просто передаём данные строки
  }

  return (
    <Flex gap={8} justify="center">
      <button className="action-cell__btn " onClick={handleClick} title="Просмотр карточки долга">
        <Icon className={cn(eyeIcon, "action-cell__icon")} />
      </button>
    </Flex>
  )
}
