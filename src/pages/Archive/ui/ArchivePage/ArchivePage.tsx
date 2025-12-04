import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const ArchivePage: React.FC = () => (
  <Flex className="archive-page" gap={16} vertical>
    <Typography.Title>Архив</Typography.Title>
    <Typography.Text>Дело переходит в архив только после финального статуса. Вид так же таблица</Typography.Text>
    <Typography.Title>Вариант вкладок</Typography.Title>
    <ul className="li">
      <li>Архив дел</li>
      <li>Архив должников ???</li>
    </ul>
    <Typography.Title>Вариант столбцов</Typography.Title>
    <ul className="li">
      <li>Причина закрытия дела</li>
      <ul>
        <li>Полностью оплачено</li>
        <li>Иск отклонён / производство прекращено</li>
        <li>Долг списан по истечению срока давности</li>
        <li>Долг признан безнадёжным</li>
      </ul>
    </ul>
    <ul className="li">
      <li>нельзя редактировать, только просматривать</li>
      <li>фильтры и колонки - дата закрытия, причина архивации</li>
      <li>поиск по ФИО, адресу, номеру дела</li>
    </ul>
  </Flex>
)
