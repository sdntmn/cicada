import { Account } from "@/entities/Account"

interface FilterParams {
  accounts: Account[]
  minDebt?: number // из sumValue
  selectedHouseIds: string[] // например: ["тюмень-1", "екб-5"]
}

export const filterAccounts = ({ accounts, minDebt, selectedHouseIds }: FilterParams): Account[] =>
  accounts.filter((account) => {
    // 1. Фильтр по выбранным домам (если есть выбор)
    const isHouseSelected = selectedHouseIds.length === 0 || selectedHouseIds.includes(account.id)

    if (!isHouseSelected) {
      return false
    }

    // 2. Фильтр по сумме долга (если задано)
    if (minDebt != null && Number(account.debt) < minDebt) {
      return false
    }

    return true
  })
