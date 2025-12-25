import { useState } from "react"

import type { InitialData } from "../../types/analysisTypes"

export const useEditModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDebtor, setSelectedDebtor] = useState<InitialData | null>(null)
  const [editingData, setEditingData] = useState<InitialData | null>(null)

  const open = (debtor: InitialData) => {
    setSelectedDebtor(debtor)
    setEditingData({ ...debtor })
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setEditingData(null)
    setSelectedDebtor(null)
  }

  return {
    close,
    editingData,
    isOpen,
    open,
    selectedDebtor,
  }
}
