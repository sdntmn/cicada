import React from "react"

import { actualLocationIcon, emailIcon, phoneIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import type { InitialData } from "../../lib/types/analysisTypes"

interface PersonDataCellProps {
  onCellClick?: (rowData: InitialData, e: React.MouseEvent) => void
  rowData: InitialData
}

export const CellDebtor: React.FC<PersonDataCellProps> = ({ onCellClick, rowData }) => {
  const handleClick = (e: React.MouseEvent) => {
    onCellClick?.(rowData, e)
  }

  return (
    <Flex gap={6} onClick={handleClick} style={{ padding: "12px 0" }} vertical>
      <span>{rowData.fio ? rowData.fio : "-"}</span>
      <Flex gap={8} style={{ fontSize: "13px", lineHeight: "14px" }}>
        <span style={{ color: "#cccccc" }}>ПАСПОРТ | СНИЛС | ИНН</span>
        <Icon className={phoneIcon} />
        <Icon className={emailIcon} />
        <Icon className={actualLocationIcon} title="Адрес" />
      </Flex>
    </Flex>
  )
}
