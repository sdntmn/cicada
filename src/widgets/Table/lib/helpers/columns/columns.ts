import { Account } from "@/entities/Accounts"
import { Column } from "@/shared/ui/TableSort/types"

export const dataColumns: Column<Account>[] = [
  {
    isSortable: false,
    name: "account",
    title: "Лицевой счет",
  },
  {
    isSortable: false,
    name: "address",
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
    align: "right",
    isSortable: true,
    name: "debt",
    sorter: (a: Account, b: Account) => Number(a.debt) - Number(b.debt),
    title: "Долг",
  },
  {
    align: "right",
    isSortable: true,
    name: "penalty",
    sorter: (a: Account, b: Account) => Number(a.penalty) - Number(b.penalty),
    title: "Пени",
  },
  {
    isSortable: false,
    name: "status",
    title: "Статус",
  },
]
