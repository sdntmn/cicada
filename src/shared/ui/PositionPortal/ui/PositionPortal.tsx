import React, { useCallback, useRef } from "react"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { useAnimation, useOnClickOutside } from "@/shared/lib/hooks"
import { Portal } from "@/shared/ui/Portal"
import { PositionedWrap } from "@/shared/ui/PositionedWrap"

interface Props {
  anchorRef: React.RefObject<HTMLElement>
  children: React.ReactNode
  className: string
  distanceBetweenElements: number
  horizontalAlignment?: HORIZONTAL_POSITION
  isOpen: boolean
  onClose: () => void
}

export const PositionPortal: React.FC<Props> = ({
  anchorRef,
  children,
  className,
  distanceBetweenElements,
  horizontalAlignment,
  isOpen,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const { isClosing } = useAnimation(isOpen, {
    durationClose: 200,
  })

  const handleClose = useCallback(() => {
    if (isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  useOnClickOutside(contentRef, handleClose, isOpen, anchorRef)

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
        refParent={anchorRef}
      >
        <div className={className} ref={contentRef}>
          {children}
        </div>
      </PositionedWrap>
    </Portal>
  )
}
