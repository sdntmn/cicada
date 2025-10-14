import { RefObject } from "react"

export const updateScroll = (ref: RefObject<HTMLUListElement>, activeIndex: number) => {
  const listItems = ref.current?.children
  if (listItems && listItems[activeIndex]) {
    const selectedElement = listItems[activeIndex] as HTMLElement

    if (selectedElement?.scrollIntoView) {
      selectedElement.scrollIntoView({ block: "nearest", inline: "nearest" })
    }
  }
}
