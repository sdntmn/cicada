import React from "react"

import cn from "classnames"
import { TextTag, Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/analysisTypes"

import "./styles.scss"

interface DebtorCardModalProps {
  debtor: InitialData | null
  isOpen: boolean
}

export const CardDetailsDebtor: React.FC<DebtorCardModalProps> = ({ debtor, isOpen }) => {
  if (!debtor) {
    return null
  }

  return (
    <Flex className={cn("debtor-card", true && "debtor-card_open")} title="Карточка должника" vertical>
      <Flex className="debtor-card__title-wrap" justify="space-between">
        Должник
      </Flex>
      <Flex className="debtor-card__body" vertical>
        <Flex vertical>
          <Typography.Title level={4}>Персональные данные</Typography.Title>
          <Typography.Text>ФИО:</Typography.Text>
          <Typography.Text tag={TextTag.PARAGRAPH}>
            <span>{debtor.fio}</span>
          </Typography.Text>
          <Typography.Text>Дата рождения:</Typography.Text>
          <Typography.Text>Паспортные данные (серия, номер, кем и когда выдан):</Typography.Text>
          <Typography.Text>ИНН / СНИЛС:</Typography.Text>
          <Typography.Text>Контактные данные:</Typography.Text>
          <Typography.Text>телефоны:</Typography.Text>
          <Typography.Text>email:</Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
