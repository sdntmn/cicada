import React, { useCallback, useEffect, useRef } from "react"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { useAnimation, useOnClickOutside } from "@/shared/lib/hooks"
import { Portal } from "@/shared/ui/Portal"
import { PositionedWrap } from "@/shared/ui/PositionedWrap"

interface Props {
  children: React.ReactNode
  className: string
  componentId: string
  distanceBetweenElements: number
  horizontalAlignment?: HORIZONTAL_POSITION
  isOpen: boolean
  onClose: () => void
}

export const PositionPortal: React.FC<Props> = ({
  children,
  className,
  componentId,
  distanceBetweenElements,
  horizontalAlignment,
  isOpen,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const refParent = useRef<HTMLElement | null>(null)

  // Анимация
  const { isClosing } = useAnimation(isOpen, {
    durationClose: 200,
  })

  const handleClose = useCallback(() => {
    if (isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  // Синхронизируем buttonRef
  useEffect(() => {
    refParent.current = document.getElementById(componentId)
  }, [componentId])

  // Закрытие по клику вне
  useOnClickOutside(
    contentRef,
    () => {
      handleClose()
    },
    isOpen,
    refParent as React.RefObject<HTMLElement>
  )

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
        refParent={refParent}
      >
        <div className={className} ref={contentRef}>
          {children}
        </div>
      </PositionedWrap>
    </Portal>
  )
}
