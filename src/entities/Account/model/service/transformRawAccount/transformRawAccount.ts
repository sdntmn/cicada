import { AccountApi } from "@/shared/api/AccountsApi"

import { Account } from "../../types/account"

export const transformRawAccount = (raw: AccountApi): Account => {
  const { apartment: flat, city, house, street } = raw.address || {}

  const addressStr = [street, `д. ${house}`, `кв. ${flat}`].filter(Boolean).join(", ") || ""

  return {
    account: raw.account_number,
    address: addressStr,
    city: city || "",
    debt: String(raw.debt),
    debtTermMounts: raw.debt_term_months,
    fio: raw.fio,
    houseId: raw.house_id,
    id: raw.id,
    penalty: String(raw.penalty),
    rowIndex: raw.rowIndex,
  }
}
