import { RefObject } from "react"

import { DEFAULT_DISTANCE_BETWEEN_ELEMENTS, VERTICAL_POSITION } from "@/shared/constants"

export interface DocumentDimensions {
  documentHeight: number
  documentWidth: number
}

export const getDocumentDimensions = (): DocumentDimensions => ({
  documentHeight: document.documentElement.clientHeight,
  documentWidth: document.documentElement.clientWidth,
})

export interface ParentDimensions {
  parentBottom: number
  parentHeight: number
  parentLeft: number
  parentTop: number
  parentWidth: number
}

export const getParentDimensions = (ref: HTMLElement): ParentDimensions => {
  const rect: DOMRect = ref.getBoundingClientRect()
  return {
    parentBottom: rect.bottom,
    parentHeight: rect.height,
    parentLeft: rect.left,
    parentTop: rect.top,
    parentWidth: rect.width,
  }
}

export const getVerticalPosition = (
  refParent: RefObject<HTMLDivElement>,
  ref: RefObject<HTMLUListElement | HTMLDivElement>,
  distanceBetweenElements?: number
): VERTICAL_POSITION => {
  const { documentHeight } = getDocumentDimensions()
  const parent = refParent?.current
  const { parentBottom } = getParentDimensions(parent as HTMLDivElement)
  const distanceUnder: number = documentHeight - parentBottom
  const currentDistanceBetweenElements = distanceBetweenElements ?? DEFAULT_DISTANCE_BETWEEN_ELEMENTS

  if (distanceUnder > (ref.current?.offsetHeight ?? 0) + currentDistanceBetweenElements) {
    return VERTICAL_POSITION.BOTTOM
  } else {
    return VERTICAL_POSITION.TOP
  }
}
