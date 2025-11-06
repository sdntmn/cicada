// // entities/Expertise/config/startTableConfig.ts
// import { ColumnConfig } from "@/shared/lib/types/tableTypes"
// import { ExpertiseColumnTable, StartExpertise } from "../types/types"

// import React from "react"

// import { Account } from "@/entities/Account"
// import { DataColumn, VirtualColumn } from "@/shared/ui/TableSort/tableTypes"

// import { ColumnTableSelect } from "../types/table"
// import { BaseColumnTableSelect } from "@/widgets/Table/lib/constants/enums"

// // const parseDebtValue = (value: any): number => {
// //   if (value == null || value === "") {
// //     return 0
// //   }
// //   const str = String(value).trim()
// //   if (str === "—" || str === "–" || str === "-") {
// //     return 0
// //   }
// //   const normalized = str.replace(/\s+/g, "").replace(",", ".")
// //   const num = Number(normalized)
// //   return isNaN(num) ? 0 : num
// // }

// // const formatCurrency = (value: number): React.ReactNode => {
// //   const formatted = value.toLocaleString("ru-RU", {
// //     maximumFractionDigits: 2,
// //     minimumFractionDigits: 2,
// //   })
// //   return <span className="table-number">{formatted}</span>
// // }
// export const EXPERTISE_TABLE_COLUMNS: Record<ExpertiseColumnTable, DataColumn<Account>> = {
//   [BaseColumnTableSelect.ACCOUNT]: {
//     isFilterable: true,
//     isSortable: true,
//     name: BaseColumnTableSelect.ACCOUNT,
//     title: "Лицевой счет",
//     type: "data",
//   },
//   [BaseColumnTableSelect.ADDRESS]: {
//     isSortable: false,
//     name: BaseColumnTableSelect.ADDRESS,
//     title: "Адрес",
//     type: "data",
//   },
//   [BaseColumnTableSelect.CITY]: {
//     isFilterable: true,
//     isSortable: true,
//     name: BaseColumnTableSelect.CITY,
//     title: "Город",
//     type: "data",
//   },
//   [BaseColumnTableSelect.DEBT]: {
//     align: "right",
//     isFilterable: true,
//     isSortable: true,
//     name: BaseColumnTableSelect.DEBT,
//     render: (value) => formatCurrency(parseDebtValue(value)),
//     sorter: (a, b) => parseDebtValue(a.debt) - parseDebtValue(b.debt),
//     title: "Долг",
//     type: "data",
//   },
//   [BaseColumnTableSelect.FIO]: {
//     isFilterable: true,
//     isSortable: true,
//     name: BaseColumnTableSelect.FIO,
//     sorter: (a, b) => a.fio.localeCompare(b.fio),
//     title: "ФИО",
//     type: "data",
//   },
//   [BaseColumnTableSelect.PENALTY]: {
//     align: "right",
//     isFilterable: true,
//     isSortable: true,
//     name: BaseColumnTableSelect.PENALTY,
//     render: (value) => formatCurrency(parseDebtValue(value)),
//     sorter: (a, b) => parseDebtValue(a.penalty) - parseDebtValue(b.penalty),
//     title: "Пени",
//     type: "data",
//   },
// }

// export const VIRTUAL_COLUMN: VirtualColumn<Account> = {
//   align: "center",
//   name: "index",
//   render: (_, rowIndex) => <span>{Number(rowIndex) + 1}</span>,
//   title: "№",
//   type: "virtual",
// }

// export const DEFAULT_VISIBLE: ColumnTableSelect[] = [
//   VirtualColumnTableSelect.INDEX,
//   BaseColumnTableSelect.FIO,
//   BaseColumnTableSelect.ACCOUNT,
//   BaseColumnTableSelect.DEBT,
//   BaseColumnTableSelect.ADDRESS,
//   BaseColumnTableSelect.CITY,
//   BaseColumnTableSelect.PENALTY,
// ]

// export const REQUIRED_COLUMNS = new Set<ColumnTableSelect>([BaseColumnTableSelect.ACCOUNT, BaseColumnTableSelect.FIO])

// export const SELECTION_TABLE_DISPLAY_ORDER: ColumnTableSelect[] = [
//   VirtualColumnTableSelect.INDEX,
//   BaseColumnTableSelect.ACCOUNT,
//   BaseColumnTableSelect.FIO,
//   BaseColumnTableSelect.ADDRESS,
//   BaseColumnTableSelect.CITY,
//   BaseColumnTableSelect.DEBT,
//   BaseColumnTableSelect.PENALTY,
// ]

// export const COLUMN_LABELS: Record<ColumnTableSelect, string> = {
//   [BaseColumnTableSelect.ACCOUNT]: "Лицевой счет",
//   [BaseColumnTableSelect.ADDRESS]: "Адрес",
//   [BaseColumnTableSelect.CITY]: "Город",
//   [BaseColumnTableSelect.DEBT]: "Долг",
//   [BaseColumnTableSelect.FIO]: "ФИО",
//   [BaseColumnTableSelect.PENALTY]: "Пени",
//   [VirtualColumnTableSelect.INDEX]: "№",
// }

// export const START_EXPERTISE_COLUMNS_CONFIG: ColumnConfig<StartExpertise> = {
//   columns: {
//     expertName: {
//       name: "expertName",
//       title: "Эксперт",
//       type: "data",
//       isSortable: true,
//       isFilterable: true,
//       align: "left"
//     },
//     startDate: {
//       name: "startDate",
//       title: "Дата начала",
//       type: "data",
//       isSortable: true,
//       align: "center"
//     },
//     status: {
//       name: "status",
//       title: "Статус",
//       type: "data",
//       isFilterable: true,
//       align: "center"
//     }
//   },
//   virtualColumn: {
//     name: "index",
//     title: "№",
//     type: "virtual",
//     align: "center",
//     render: (_, rowIndex) => <span>{Number(rowIndex) + 1}</span>
//   },
//   requiredColumns: new Set(["expertName"]),
//   displayOrder: ["index", "expertName", "startDate", "status"],
//   defaultVisible: ["index", "expertName", "startDate", "status"],
//   columnLabels: {
//     index: "№",
//     expertName: "Эксперт",
//     startDate: "Дата начала",
//     status: "Статус"
//   }
// }
