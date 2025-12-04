import React from "react"

import cn from "classnames"

import { editIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

interface Props {
  onEdit: (debtor: InitialData) => void
  rowData: InitialData
}

export const ActionEditCell: React.FC<Props> = ({ onEdit, rowData }) => {
  // const dispatch = useAppDispatch()

  const handleSendClaim = () => {
    // dispatch(sendClaim([rowData.id]))
    onEdit(rowData)
    console.info(rowData)
  }

  return (
    <Flex gap={8} justify="center">
      <button className="action-cell__btn " onClick={handleSendClaim} title="Редактировать">
        <Icon className={cn(editIcon, "action-cell__icon")} />
      </button>
    </Flex>
  )
}
