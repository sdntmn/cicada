import type { RefObject } from "react"

import { getVerticalPosition } from "../getVerticalPosition/getVerticalPosition"

export enum VERTICAL_POSITION {
  BOTTOM = "bottom",
  TOP = "top",
}

export const getTransformOriginByAxisX = (
  refParent: RefObject<HTMLDivElement>,
  refChildren: RefObject<HTMLUListElement | HTMLDivElement>,
  distanceBetweenElements?: number
): string => {
  const verticalPosition: VERTICAL_POSITION = getVerticalPosition(refParent, refChildren, distanceBetweenElements)

  const startPosition: VERTICAL_POSITION =
    verticalPosition === VERTICAL_POSITION.TOP ? VERTICAL_POSITION.BOTTOM : VERTICAL_POSITION.TOP

  return `center ${startPosition}`
}
