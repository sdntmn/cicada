import { RefObject, useEffect, useRef } from "react"

type Event = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  show: boolean = true,
  handlerRef?: RefObject<T>
): void => {
  const isScrollingRef = useRef(false)

  const listener = (event: Event) => {
    if ("touches" in event && event.type === "touchmove") {
      isScrollingRef.current = true
      return
    }

    if ("touches" in event && event.type === "touchend" && isScrollingRef.current) {
      isScrollingRef.current = false
      return
    }

    const target = ref.current
    const handlerTarget = handlerRef?.current

    if (
      target &&
      !target.contains(event.target as HTMLElement) &&
      (!handlerTarget || !handlerTarget.contains(event.target as HTMLElement))
    ) {
      handler(event)
    }
  }

  useEffect(() => {
    if (!show) {
      return
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchmove", listener)
    document.addEventListener("touchend", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchmove", listener)
      document.removeEventListener("touchend", listener)
    }
  }, [show])
}
