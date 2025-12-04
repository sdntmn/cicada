import { useCallback, useState } from "react"

interface UseSlidePanelProps {
  defaultModal?: boolean
  defaultOpen?: boolean
  onClose?: () => void
  onModeChange?: (isModal: boolean) => void
  onOpen?: () => void
  onSelectedRowChange?: (rowId: string | null) => void
}

export const useSlidePanel = ({
  defaultModal = false,
  defaultOpen = false,
  onClose,
  onModeChange,
  onOpen,
  onSelectedRowChange,
}: UseSlidePanelProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isModal, setIsModal] = useState(defaultModal)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [editingRowPosition, setEditingRowPosition] = useState<{ height: number; top: number } | null>(null)

  const updateRowPosition = useCallback((rowId: string) => {
    // Находим DOM элемент строки и обновляем позицию
    const rowElement = document.querySelector(`[data-row-id="${rowId}"]`)
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect()
      setEditingRowPosition({
        height: rect.height,
        top: rect.top,
      })

      // Обновляем CSS переменные
      document.documentElement.style.setProperty("--editing-row-top", `${rect.top}px`)
      document.documentElement.style.setProperty("--editing-row-height", `${rect.height}px`)
    }
  }, [])

  const open = useCallback(
    (rowId?: string) => {
      setIsOpen(true)
      if (rowId) {
        setSelectedRowId(rowId)
        onSelectedRowChange?.(rowId)
        // Даем время на рендер строки перед расчетом позиции
        setTimeout(() => updateRowPosition(rowId), 100)
      }
      onOpen?.()
    },
    [onOpen, onSelectedRowChange, updateRowPosition]
  )

  const close = useCallback(() => {
    setIsOpen(false)
    setSelectedRowId(null)
    onSelectedRowChange?.(null)
    onClose?.()
  }, [onClose, onSelectedRowChange])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const toggleMode = useCallback(() => {
    setIsModal((prev) => {
      const newMode = !prev
      onModeChange?.(newMode)
      return newMode
    })
  }, [onModeChange])

  const setMode = useCallback(
    (modal: boolean) => {
      setIsModal(modal)
      onModeChange?.(modal)
    },
    [onModeChange]
  )

  const selectRow = useCallback(
    (rowId: string) => {
      setSelectedRowId(rowId)
      onSelectedRowChange?.(rowId)
    },
    [onSelectedRowChange]
  )

  return {
    close,
    editingRowPosition,
    isModal,
    isOpen,
    open,
    selectedRowId,
    selectRow,
    setMode,
    toggle,
    toggleMode,
  }
}
