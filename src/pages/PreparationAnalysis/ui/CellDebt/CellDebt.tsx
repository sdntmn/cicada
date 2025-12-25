import React from "react"

import cn from "classnames"

import { actualLocationIcon, editIcon, emailIcon, shareIcon, userIcon } from "@/shared/constants"
import { ButtonIcon } from "@/shared/ui/ButtonIcon"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import type { InitialData } from "../../lib/types/analysisTypes"

import "./styles.scss"

interface Props {
  onCellClick?: (rowData: InitialData, e: React.MouseEvent) => void
  onEdit?: (debtor: InitialData) => void
  rowData: InitialData
}

export const CellDebt: React.FC<Props> = ({ onCellClick, onEdit, rowData }) => {
  const handleClick = (e: React.MouseEvent) => {
    onCellClick?.(rowData, e)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit?.(rowData)
    }
  }
  return (
    <Flex className="cell-debt" gap={8} onClick={handleClick} vertical>
      <Flex gap={8}>
        <Icon className={actualLocationIcon} title="Адрес" />
        <span>{rowData.address ? `${rowData.city} ${rowData.address}` : "-"}</span>
      </Flex>
      <Flex gap={8}>
        <span>Долг: {rowData.debt ? `${rowData.debt}` : "-"}</span>
        <span>Пени: {rowData.penalty ? `${rowData.penalty}` : "-"}</span>
      </Flex>
      <Flex gap={8}>
        <span>Период 01.01.2025 - 01.12.2025</span>
      </Flex>

      <Flex className="cell-debt__row-icon" gap={8}>
        <Flex gap={8} style={{ fontSize: "14px", lineHeight: "14px" }}>
          <span style={{ color: "#cccccc" }}> {rowData.account?.length ? 1 : "-"}</span>
          <Icon className={shareIcon} />
          <Icon className={userIcon} />
        </Flex>
      </Flex>
      <ButtonIcon className="cell-debt__btn" icon={editIcon} iconClassName="cell-debt__btn-icon" onClick={handleEdit} size="sm" />
    </Flex>
  )
}
