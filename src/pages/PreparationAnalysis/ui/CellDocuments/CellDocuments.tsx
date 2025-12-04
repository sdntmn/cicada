import React from "react"

import cn from "classnames"

import { editDataIcon, emailIcon, registrationLocationIcon, shareIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import type { InitialData } from "../../lib/types/initialDataTypes"

interface Props {
  onCellClick?: (rowData: InitialData, e: React.MouseEvent) => void
  onEdit?: (debtor: InitialData) => void
  rowData: InitialData
}

export const CellDocuments: React.FC<Props> = ({ onCellClick, onEdit, rowData }) => {
  const handleClick = (e: React.MouseEvent) => {
    onCellClick?.(rowData, e)
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(rowData)
    }
  }
  return (
    <Flex gap={8} onClick={handleClick} vertical>
      <Flex gap={8} style={{ padding: "8px 0" }} vertical>
        <span>Нет прикрепленных документов</span>
        <Flex gap={8} style={{ fontSize: "14px", lineHeight: "14px" }}>
          <span style={{ color: "#cccccc" }}> {rowData.account?.length ? 1 : "-"}</span>
          <span style={{ color: "#cccccc" }}> ФИО</span>
          <Icon className={shareIcon} />
          <Icon className={emailIcon} />

          <Icon className={registrationLocationIcon} title="Адрес регистрации" />
        </Flex>
      </Flex>
      <button className="action-cell__btn " onClick={handleEdit} title="Просмотр карточки долга">
        <Icon className={cn(editDataIcon, "action-cell__icon")} />
      </button>
    </Flex>
  )
}
