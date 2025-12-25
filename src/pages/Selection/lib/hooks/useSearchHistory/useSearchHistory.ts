import { useCallback, useEffect, useState } from "react"

import { STORAGE_KEY } from "../../constants"
import { loadSearchHistory, saveSearchQuery } from "../../helpers/searchHistory/searchHistory"
import type { SearchHistoryItem } from "../../types/types"

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])

  useEffect(() => {
    setHistory(loadSearchHistory())
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setHistory(loadSearchHistory())
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const saveQuery = useCallback((query: Omit<SearchHistoryItem, "timestamp">) => {
    const newQuery: SearchHistoryItem = {
      ...query,
      timestamp: Date.now(),
    }

    const updatedHistory = saveSearchQuery(newQuery)
    setHistory(updatedHistory)

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        newValue: JSON.stringify(updatedHistory),
      })
    )

    return newQuery
  }, [])

  const loadQuery = useCallback((query: SearchHistoryItem) => {
    const event = new CustomEvent("load-search-history", {
      detail: { ...query, _fromHistory: true },
    })
    window.dispatchEvent(event)
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }, [])

  return {
    clearHistory,
    history,
    loadQuery,
    saveQuery,
  }
}
