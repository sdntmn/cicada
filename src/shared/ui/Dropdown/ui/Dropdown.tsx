// shared/ui/DropdownMenu/DropdownMenu.tsx
import React, { ReactNode } from "react"

import cn from "classnames"

import type { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

export interface Props {
  anchorRef: React.RefObject<HTMLElement>
  children: ReactNode
  className?: string
  distanceBetweenElements?: number
  header?: ReactNode
  horizontalAlignment?: HORIZONTAL_POSITION
  isOpen: boolean
  onClose: () => void
}

export const Dropdown: React.FC<Props> = ({
  anchorRef,
  children,
  className,
  distanceBetweenElements,
  header,
  horizontalAlignment,
  isOpen,
  onClose,
}) => (
  <PositionPortal
    anchorRef={anchorRef}
    className={cn("dropdown", className)}
    distanceBetweenElements={distanceBetweenElements}
    horizontalAlignment={horizontalAlignment}
    isOpen={isOpen}
    onClose={onClose}
  >
    {header && <div className="dropdown__header">{header}</div>}
    <>{children}</>
  </PositionPortal>
)
