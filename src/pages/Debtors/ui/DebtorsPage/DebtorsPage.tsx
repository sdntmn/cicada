import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const DebtorsPage: React.FC = () => (
  <Flex className="archive-page" gap={16} vertical>
    <Typography.Title>Должники</Typography.Title>
    <Typography.Title>Вариант вкладок</Typography.Title>
    <ul className="li">
      <li>ХЗ - надо ли</li>
    </ul>
    <Typography.Title>Вариант столбцов</Typography.Title>
    <Typography.Text>Статус</Typography.Text>
    <ul className="li">
      <li>Причина закрытия дела</li>
      <ul>
        <li>«Активный» (есть хотя бы одно незавершённое дело)</li>
        <li> «Архивный» (все дела завершены).</li>
      </ul>
    </ul>
  </Flex>
)
