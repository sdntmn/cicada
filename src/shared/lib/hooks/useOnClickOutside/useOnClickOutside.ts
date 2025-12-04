import { RefObject, useEffect, useRef } from "react"

type UIEvent = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  show: boolean = true,
  handlerRef?: RefObject<T>
): void => {
  const isScrollingRef = useRef(false)

  const clickListener = (event: UIEvent) => {
    // Обработка тач-скролла (опционально)
    if ("touches" in event) {
      if (event.type === "touchmove") {
        isScrollingRef.current = true
        return
      }
      if (event.type === "touchend" && isScrollingRef.current) {
        isScrollingRef.current = false
        return
      }
    }

    const target = ref.current
    const handlerTarget = handlerRef?.current

    const clickedInside = target?.contains(event.target as Node) || handlerTarget?.contains(event.target as Node)

    if (!clickedInside) {
      handler()
    }
  }

  useEffect(() => {
    if (!show) {
      return
    }

    const events: (keyof DocumentEventMap)[] = ["mousedown", "touchstart", "touchend"]

    events.forEach((event) => {
      document.addEventListener(event, clickListener as EventListener, true)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, clickListener as EventListener, true)
      })
    }
  }, [show])
}
