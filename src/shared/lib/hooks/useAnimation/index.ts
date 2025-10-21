import { type MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

import { DurationAnimation } from "../../types/types"

export const useAnimation = (isOpen: boolean, durationAnimation: DurationAnimation) => {
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  const [isClosing, setIsClosing] = useState(!isOpen)

  const close = useCallback(() => {
    setIsClosing(false)
    timerRef.current = setTimeout(() => {
      setIsClosing(true)
    }, durationAnimation.durationClose)
  }, [durationAnimation])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsClosing(false)
      }, 0)

      return () => clearTimeout(timer)
    } else {
      close()
      return () => {
        clearTimeout(timerRef.current)
      }
    }
  }, [isOpen])

  return { close, isClosing }
}
