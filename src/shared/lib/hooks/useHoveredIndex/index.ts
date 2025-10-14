import { RefObject, useEffect, useState } from "react"

/**
 * Хук, который позволяет получить индекс элемента над которым находится курсор
 * @param ref - ссылка на контейнер
 * @param items - массив элементов
 */

export const useHoveredIndex = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, items: any[]) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)

  useEffect(() => {
    const container = ref.current
    if (!container) {
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const children = Array.from(container.children)

      if (children.length === 0) {
        setHoveredIndex(-1)
        return
      }

      const hoveredElement = children.find((child) => {
        const rect = child.getBoundingClientRect()
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      })

      if (hoveredElement) {
        const index = children.indexOf(hoveredElement)
        setHoveredIndex(index)
      } else {
        setHoveredIndex(-1)
      }
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [ref, items])

  return hoveredIndex
}
