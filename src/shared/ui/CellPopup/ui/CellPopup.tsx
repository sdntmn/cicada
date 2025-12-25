// shared/ui/CellPopup/CellPopup.tsx
import React from "react"

import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface Props {
  anchorElement: HTMLElement | null
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const CellPopup: React.FC<Props> = ({ anchorElement, children, isOpen, onClose }) => {
  if (!isOpen || !anchorElement) {
    return null
  }

  return (
    <PositionPortal anchorElement={anchorElement} className="cell-popup" distanceBetweenElements={0} isOpen={isOpen} onClose={onClose}>
      {children}
    </PositionPortal>
  )
}
