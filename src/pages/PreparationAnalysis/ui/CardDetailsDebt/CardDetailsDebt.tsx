import React from "react"

import { Typography } from "itpc-ui-kit"

import { actualLocationIcon, userIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"

import { InitialData } from "../../lib/types/analysisTypes"

import "./styles.scss"

interface DebtorCardModalProps {
  debtor: InitialData | null
}

export const CardDetailsDebt: React.FC<DebtorCardModalProps> = ({ debtor }) => {
  if (!debtor) {
    return null
  }

  const safeDebtor = {
    address: debtor.address || "—",
    debt: debtor.debt || "—",
    fio: debtor.fio || "—",
    penalty: debtor.penalty || "—",
  }

  const period = "01.01.2025 – 01.10.2025"

  const rows = [
    { icon: actualLocationIcon, label: "Адрес", value: safeDebtor.address },
    { icon: userIcon, label: "ФИО", value: safeDebtor.fio },
    { icon: userIcon, label: "Долг", value: safeDebtor.debt },
    { icon: userIcon, label: "Пени", value: safeDebtor.penalty },
    { icon: userIcon, label: "Период", value: period },
  ]

  return (
    <div className="card-details-debt">
      <Typography.Title className="card-details-debt__title" level={5}>
        Данные о долге
      </Typography.Title>
      <table className="card-details-debt__table">
        <tbody>
          {rows.map((row, i) => (
            <tr className="card-details-debt__row card-details-debt__hover" key={i}>
              <td className="card-details-debt__label">
                <Icon className={row.icon} />
                <span>{row.label}</span>
              </td>
              <td className="card-details-debt__value">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
