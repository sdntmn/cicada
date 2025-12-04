import React from "react"

import cn from "classnames"

import { actualLocationIcon, emailIcon, eyeIcon, shareIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

interface Props {
  rowData: InitialData
}

export const CellPremisesData: React.FC<Props> = ({ rowData }) => (
  <Flex className="cell-premises-data" gap={8} vertical>
    <span>{rowData.address ? `${rowData.city} ${rowData.address}` : "-"}</span>
    <Flex className="cell-premises-data__row-icon" gap={8}>
      <Flex gap={8} style={{ fontSize: "14px", lineHeight: "14px" }}>
        <span style={{ color: "#cccccc" }}> {rowData.account?.length ? 1 : "-"}</span>
        <span style={{ color: "#cccccc" }}> ФИО</span>
        <Icon className={shareIcon} />
        <Icon className={emailIcon} />
        <Icon className={actualLocationIcon} title="Адрес" />
      </Flex>

      {/* <ButtonIcon className="cell-premises-data__btn-icon" icon={eyeIcon} /> */}
    </Flex>
  </Flex>
)
