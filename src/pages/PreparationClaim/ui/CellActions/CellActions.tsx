import React from "react"

import cn from "classnames"

import { editDataIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

interface ActionCellProps {
  onEdit: (debtor: InitialData) => void

  rowData: InitialData
}

export const CellActions: React.FC<ActionCellProps> = ({ onEdit, rowData }) => {
  const handleEdit = () => {
    onEdit(rowData)
  }

  return (
    <Flex gap={8} justify="center">
      <button className="action-cell__btn " onClick={handleEdit} title="Редактировать">
        <Icon className={cn(editDataIcon, "action-cell__icon")} />
      </button>
    </Flex>
  )
}
