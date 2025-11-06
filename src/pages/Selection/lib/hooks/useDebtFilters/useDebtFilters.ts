import { useCallback, useState } from "react"

import { FilterMode } from "@/pages/Selection/lib/constants/enum"

interface UseDebtFiltersOptions {
  initialMode?: FilterMode
  initialSum?: string
  initialTerm?: string
}

export const useDebtFilters = ({ initialMode = FilterMode.ANY, initialSum = "", initialTerm = "" }: UseDebtFiltersOptions = {}) => {
  const [sumValue, setSumValue] = useState<string>(initialSum)
  const [termValue, setTermValue] = useState<string>(initialTerm)
  const [filterMode, setFilterMode] = useState<FilterMode>(initialMode)

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

  const handleSearchModeChange = useCallback((mode: FilterMode) => {
    setFilterMode(mode)
  }, [])

  const handleClearSum = () => setSumValue("")
  const handleClearTerm = () => setTermValue("")

  const clearFilters = useCallback(() => {
    handleClearSum()
    handleClearTerm()
    setFilterMode(initialMode)
  }, [])

  return {
    clearFilters,
    filterMode,
    handleClearSum,
    handleClearTerm,
    handleSearchModeChange,
    handleSumChange,
    handleSumSliderChange,
    handleTermChange,
    handleTermSliderChange,
    sumValue,
    termValue,
  }
}
