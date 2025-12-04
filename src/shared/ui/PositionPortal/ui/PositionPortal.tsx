import React, { useCallback, useRef } from "react"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { useAnimation, useOnClickOutside } from "@/shared/lib/hooks"
import { Portal } from "@/shared/ui/Portal"
import { PositionedWrap } from "@/shared/ui/PositionedWrap"

interface Props {
  anchorElement?: HTMLElement | null
  anchorRef?: React.RefObject<HTMLElement>
  children: React.ReactNode
  className?: string
  distanceBetweenElements: number
  horizontalAlignment?: HORIZONTAL_POSITION
  isOpen: boolean
  onClose: () => void
}

export const PositionPortal: React.FC<Props> = ({
  anchorElement,
  anchorRef,
  children,
  className,
  distanceBetweenElements,
  horizontalAlignment,
  isOpen,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  if (!anchorRef && !anchorElement) {
    console.error("PositionPortal: either anchorRef or anchorElement must be provided")
    return null
  }

  // Унифицируем до RefObject — именно это ожидает PositionedWrap
  const resolvedAnchorRef = React.useMemo(() => {
    if (anchorRef) {
      return anchorRef
    }
    return { current: anchorElement } as React.RefObject<HTMLElement>
  }, [anchorRef, anchorElement])

  const { isClosing } = useAnimation(isOpen, {
    durationClose: 200,
  })

  const handleClose = useCallback(() => {
    if (isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  useOnClickOutside(contentRef, handleClose, isOpen, resolvedAnchorRef)

  if (!isOpen && isClosing) {
    return null
  }

  return (
    <Portal element={document.body}>
      <PositionedWrap
        distanceBetweenElements={distanceBetweenElements}
        horizontalAlignment={horizontalAlignment}
        isClosing={isClosing}
        isOpen={isOpen}
        position={"absolute"}
        refParent={resolvedAnchorRef}
      >
        <div className={className} ref={contentRef}>
          {children}
        </div>
      </PositionedWrap>
    </Portal>
  )
}
