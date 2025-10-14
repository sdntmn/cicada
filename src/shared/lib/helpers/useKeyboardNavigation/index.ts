import React, { useState } from "react"

import { Item, KeyCode } from "itpc-ui-kit"

export const useKeyboardNavigation = (items: Item[]) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const handleKeyUpAndDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement | HTMLDivElement>) => {
    event.preventDefault()

    switch (event.key) {
      case KeyCode.ARROW_UP:
        let newIndexUp = activeIndex
        do {
          newIndexUp = newIndexUp === 0 ? items.length - 1 : newIndexUp - 1
        } while (items[newIndexUp].disabled)
        setActiveIndex(newIndexUp)
        break

      case KeyCode.ARROW_DOWN:
        let newIndexDown = activeIndex
        do {
          newIndexDown = newIndexDown === items.length - 1 ? 0 : newIndexDown + 1
        } while (items[newIndexDown].disabled)
        setActiveIndex(newIndexDown)
        break

      default:
        break
    }
  }

  return { activeIndex, handleKeyUpAndDown, setActiveIndex }
}
