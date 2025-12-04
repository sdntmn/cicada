import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const DashboardPage: React.FC = () => (
  <Flex className="dashboard-page" vertical>
    <Typography.Title>Дашборд</Typography.Title>
    <Typography.Text>
      Глобальный поиск должен находить и активные, и архивные результаты, но с пометкой и ссылкой в нужный раздел.
    </Typography.Text>
    <ul>
      <li>ФИО должника</li>
      <li>ID дела или должника</li>
      <li>Адрес</li>
      <li>Номеру лицевого счёта</li>
      <li>Номеру ИНН/СНИЛС</li>
    </ul>
  </Flex>
)
