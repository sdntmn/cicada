import React from "react"

import cn from "classnames"
import { TextTag, Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

interface DebtorCardModalProps {
  debtor: InitialData | null
  isOpen: boolean
}

export const CardDetailsDocuments: React.FC<DebtorCardModalProps> = ({ debtor, isOpen, onClose }) => {
  if (!debtor) {
    return null
  }

  return (
    <Flex className={cn("debtor-card", true && "debtor-card_open")} title="Карточка должника" vertical>
      <Flex className="debtor-card__title-wrap" justify="space-between">
        <Typography.Text>Документы</Typography.Text>
      </Flex>
      <Flex className="debtor-card__body" vertical>
        <Flex vertical>
          <Typography.Title level={4}>Данные о собственности</Typography.Title>
          <Typography.Text>Адрес:</Typography.Text>
          <Typography.Text tag={TextTag.PARAGRAPH}>
            ФИО: <span>{debtor.fio}</span>
          </Typography.Text>
          <Typography.Text>Тип права:</Typography.Text>
          <Typography.Text>Кадастровый номер:</Typography.Text>
          <Typography.Text>Доли собственности:</Typography.Text>
          <Typography.Text>Площадь помещения:</Typography.Text>
          <Typography.Text>Количество проживающих/зарегистрированных:</Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
