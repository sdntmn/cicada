// src/features/Selection/lib/useDebtFilters.ts

import { useCallback, useState } from "react"

import { SearchMode } from "@/features/HouseMultiSelect/lib/types/types"

interface UseDebtFiltersOptions {
  initialMode?: SearchMode
  initialSum?: string
  initialTerm?: string
}

export const useDebtFilters = ({ initialMode = "any", initialSum = "", initialTerm = "" }: UseDebtFiltersOptions = {}) => {
  const [sumValue, setSumValue] = useState<string>(initialSum)
  const [termValue, setTermValue] = useState<string>(initialTerm)
  const [searchMode, setSearchMode] = useState<SearchMode>(initialMode)

  const handleSumChange = useCallback((value: string) => {
    setSumValue(value.replace(/[^0-9]/g, ""))
  }, [])

  const handleTermChange = useCallback((value: string) => {
    setTermValue(value.replace(/[^0-9]/g, ""))
  }, [])

  const handleSumSliderChange = useCallback((value: number) => {
    setSumValue(String(value))
  }, [])

  const handleTermSliderChange = useCallback((value: number) => {
    setTermValue(String(value))
  }, [])

  const handleSearchModeChange = useCallback((mode: SearchMode) => {
    setSearchMode(mode)
  }, [])

  const handleClearSum = () => setSumValue("")
  const handleClearTerm = () => setTermValue("")

  const clearFilters = useCallback(() => {
    handleClearSum()
    handleClearTerm()
    setSearchMode("any")
  }, [])

  return {
    clearFilters,
    handleClearSum,
    handleClearTerm,
    handleSearchModeChange,
    handleSumChange,
    handleSumSliderChange,
    handleTermChange,
    handleTermSliderChange,
    searchMode,
    sumValue,
    termValue,
  }
}
