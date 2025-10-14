import React from "react"

import cn from "classnames"

import { Account } from "@/entities/Accounts"
import { searchIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Column } from "@/shared/ui/TableSort/types"

export const dataColumnsStage: Column<Account>[] = [
  {
    icon: <Icon className={cn(searchIcon, "table-stage__icon")} />,
    isSortable: false,
    name: "account",
    title: "Лицевой счет",
  },
  {
    isSortable: false,
    name: "address",
    sorter: (a: Account, b: Account) => Number(a.id) - Number(b.id),
    title: "Адрес",
  },
  {
    isSortable: true,
    name: "city",
    title: "Город",
  },
  {
    isSortable: true,
    name: "fio",
    title: "ФИО",
  },
  {
    isSortable: true,
    name: "debt",
    title: "Долг",
  },
  {
    isSortable: true,
    name: "penalty",
    title: "Пени",
  },
]
