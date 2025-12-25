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

export const CardDebt: React.FC<DebtorCardModalProps> = ({ debtor, isOpen }) => {
  if (!debtor) {
    return null
  }

  return (
    <Flex className={cn("debtor-card", true && "debtor-card_open")} title="Карточка долга" vertical>
      <Flex className="debtor-card__title-wrap" justify="space-between">
        <Typography.Text>Карточка долга</Typography.Text>
        {/* <button className="debtor-card__btn-icon" onClick={onClose}>
          <Icon className={cn(closeIcon, "debtor-card__icon-close")} />
        </button> */}
      </Flex>
      <Flex className="debtor-card__body" vertical>
        {/* <Typography.Text tag={TextTag.PARAGRAPH}>
          Стадия процесса: <span>{debtor.stage}</span>
        </Typography.Text> */}
        <Flex vertical>
          <Typography.Title level={4}>Персональные данные</Typography.Title>
          <Typography.Text>ФИО:</Typography.Text>
          <Typography.Text tag={TextTag.PARAGRAPH}>
            <span>{debtor.fio}</span>
          </Typography.Text>
          <Typography.Text>Дата рождения:</Typography.Text>
          <Typography.Text>Паспортные данные (серия, номер, кем и когда выдан):</Typography.Text>
          <Typography.Text>ИНН / СНИЛС:</Typography.Text>
          <Typography.Text>Контактные данные: :</Typography.Text>
          <Typography.Text>телефоны: :</Typography.Text>
          <Typography.Text>email: :</Typography.Text>
        </Flex>
        {/* <Flex vertical>
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
        </Flex> */}
        {/* <Flex vertical>
          <Typography.Title level={4}>Данные о долге</Typography.Title>
          <Typography.Text>Период задолженности:</Typography.Text>

          <Typography.Text>Вид услуги (за что должен):</Typography.Text>
          <Typography.Text>Сумма</Typography.Text>
          <Typography.Text>Пени и штрафы</Typography.Text>
          <Typography.Text>Общая сумма задолженности</Typography.Text>
        </Flex> */}
        {/* <Flex vertical>
          <Typography.Title level={4}>Динамика долга</Typography.Title>
          <Typography.Text>Дата образования:</Typography.Text>

          <Typography.Text>График платежей:</Typography.Text>
          <Typography.Text>История платежей и пропусков:</Typography.Text>
        </Flex> */}
        {/* <Flex vertical>
          <Typography.Title level={4}>Дополнительная информация:</Typography.Title>
          <Typography.Text>ХЗ - на всякий случай</Typography.Text>
        </Flex>
        <Flex vertical>
          <Typography.Title level={4}>Коммуникация:</Typography.Title>
          <Typography.Text>История уведомлений </Typography.Text>
          <Typography.Text>Претензионная работа </Typography.Text>
          <Typography.Text>Жалобы и обращения от должника </Typography.Text>
        </Flex> */}
      </Flex>
    </Flex>
  )
}
