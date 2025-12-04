import { BaseDebtorApi, NewDebtorApi } from "@/shared/api/DebtorApi"

export const transformBaseDebtor = (raw: BaseDebtorApi) => {
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

export const transformNewDebtor = (raw: NewDebtorApi) => ({
  ...transformBaseDebtor(raw),
  stage: raw.debt_stage,
})
