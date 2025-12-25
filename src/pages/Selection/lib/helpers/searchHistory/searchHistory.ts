import { MAX_HISTORY_ITEMS, STORAGE_KEY } from "../../constants"
import type { SearchHistoryItem } from "../../types/types"

const arraysEqual = (a?: string[], b?: string[]): boolean => {
  if (!a && !b) {
    return true
  }
  if (!a || !b) {
    return false
  }
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.length === sortedB.length && sortedA.every((v, i) => v === sortedB[i])
}

export const areQueriesEqual = (a: SearchHistoryItem, b: SearchHistoryItem): boolean =>
  a.filterMode === b.filterMode && a.minDebt === b.minDebt && a.minTerm === b.minTerm && arraysEqual(a.houseIds, b.houseIds)
// arraysEqual(a.services, b.services),
// arraysEqual(a.payments, b.payments),

export const saveSearchQuery = (query: SearchHistoryItem): SearchHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const current: SearchHistoryItem[] = raw ? JSON.parse(raw) : []

    const existingIndex = current.findIndex((item) => areQueriesEqual(item, query))

    let updatedHistory: SearchHistoryItem[]
    if (existingIndex !== -1) {
      // Обновляем timestamp существующей записи
      const updatedItem = { ...current[existingIndex], timestamp: query.timestamp }
      updatedHistory = [updatedItem, ...current.filter((_, i) => i !== existingIndex)]
    } else {
      // Добавляем новую запись
      updatedHistory = [query, ...current]
    }

    // Сортируем и ограничиваем — без мутации
    const sorted = updatedHistory.sort((a, b) => b.timestamp - a.timestamp)
    const result = sorted.slice(0, MAX_HISTORY_ITEMS)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    return result
  } catch (error) {
    console.error("Error saving search query:", error)
    return []
  }
}

export const loadSearchHistory = (): SearchHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    const validItems = parsed.filter(
      (item): item is SearchHistoryItem => typeof item === "object" && item !== null && typeof item.timestamp === "number"
    )

    return validItems.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_HISTORY_ITEMS)
  } catch (error) {
    console.error("Error loading search history:", error)
    return []
  }
}

export const clearSearchHistory = () => {
  localStorage.removeItem(STORAGE_KEY)
}
