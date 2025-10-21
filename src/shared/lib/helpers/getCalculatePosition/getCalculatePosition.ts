import { CSSProperties, RefObject } from "react"

import {
  ALLOWED_POSITIONS,
  DEFAULT_DISTANCE_BETWEEN_ELEMENTS,
  DIVIDER_IN_TWO,
  GetHorizontalPositionArg,
  HORIZONTAL_POSITION,
  PositionType,
  VERTICAL_POSITION,
} from "@/shared/constants"

import { getElementDimensions } from "../getDemensions"
import { getDocumentDimensions, getParentDimensions } from "../getVerticalPosition/getVerticalPosition"

export const getHorizontalPosition = (arg: GetHorizontalPositionArg): HORIZONTAL_POSITION => {
  const { defaultParentWidth, distanceRight, documentWidth, elementWidth, parentLeft, parentWidth, scrollbarWidth } = arg

  const currentWidth = elementWidth !== 0 ? elementWidth : defaultParentWidth

  const rightEdgeFromCenter = parentWidth / DIVIDER_IN_TWO + distanceRight
  const leftEdgeFromCenter = parentWidth / DIVIDER_IN_TWO + parentLeft
  const calendarHalfWidth = elementWidth / DIVIDER_IN_TWO
  const rightStartParent = distanceRight + parentWidth
  const leftEndParent = parentWidth + parentLeft

  if (currentWidth !== undefined) {
    if (rightStartParent <= elementWidth && leftEndParent <= elementWidth) {
      return HORIZONTAL_POSITION.CALCULATED
    }

    if (parentWidth > currentWidth) {
      return HORIZONTAL_POSITION.LEFT
    } else {
      if (documentWidth - scrollbarWidth < currentWidth) {
        return HORIZONTAL_POSITION.CALCULATED
      } else {
        if (parentWidth + distanceRight > currentWidth) {
          return HORIZONTAL_POSITION.LEFT
        }

        if (rightEdgeFromCenter > calendarHalfWidth && leftEdgeFromCenter > calendarHalfWidth) {
          return HORIZONTAL_POSITION.CENTER
        }

        if (parentWidth + parentLeft > currentWidth) {
          return HORIZONTAL_POSITION.RIGHT
        }

        return HORIZONTAL_POSITION.CALCULATED
      }
    }
  }

  return HORIZONTAL_POSITION.CALCULATED
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

export const getCalculatePosition = (
  refParent: React.RefObject<HTMLElement>,
  refChildren: React.RefObject<HTMLUListElement | HTMLElement>,
  position: PositionType,
  distanceBetweenElements?: number,
  horizontalAlignment?: HORIZONTAL_POSITION
): CSSProperties => {
  if (position !== ALLOWED_POSITIONS.ABSOLUTE && position !== ALLOWED_POSITIONS.FIXED) {
    throw new Error(`Недопустимое значение свойства position: ${position}. Допустимые значения: absolute, fixed`)
  }

  if (refParent?.current && refChildren?.current) {
    const { documentHeight, documentWidth } = getDocumentDimensions()

    const { elementHeight, elementWidth } = getElementDimensions(refChildren.current)

    const { parentBottom, parentLeft, parentTop, parentWidth } = getParentDimensions(refParent.current)

    const scrollbarWidth: number = window.innerWidth - documentWidth

    const distanceRight: number = documentWidth - (parentLeft + parentWidth)

    const argHorizontalPosition: GetHorizontalPositionArg = {
      distanceRight,
      documentWidth,
      elementWidth,
      parentLeft,
      parentWidth,
      scrollbarWidth,
    }

    const horizontalPosition: HORIZONTAL_POSITION = horizontalAlignment
      ? horizontalAlignment
      : getHorizontalPosition(argHorizontalPosition)

    const distanceUnderInput: number = documentHeight - parentBottom

    const currentDistanceBetweenElements: number = distanceBetweenElements ?? DEFAULT_DISTANCE_BETWEEN_ELEMENTS

    let verticalPosition: VERTICAL_POSITION
    if (distanceUnderInput > elementHeight + currentDistanceBetweenElements) {
      verticalPosition = VERTICAL_POSITION.BOTTOM
    } else {
      verticalPosition = VERTICAL_POSITION.TOP
    }

    const scrollTop = window.scrollY || window.pageYOffset
    const verticalBottomPosition: number = parentBottom + currentDistanceBetweenElements

    const verticalBottomPositionAbsolute: number = parentBottom + currentDistanceBetweenElements + scrollTop

    const verticalTopPosition: number = parentTop - currentDistanceBetweenElements - elementHeight

    const verticalTopPositionAbsolute: number = parentTop - currentDistanceBetweenElements - elementHeight + scrollTop

    const horizontalCenterPosition: number = parentLeft - (elementWidth - parentWidth) / DIVIDER_IN_TWO

    const horizontalRightPosition: number = documentWidth - parentLeft - parentWidth

    const horizontalCalculatedPosition: number = documentWidth <= elementWidth ? 0 : (documentWidth - elementWidth) / DIVIDER_IN_TWO

    const currentPosition = refChildren.current.style.position

    if (currentPosition.length && String(currentPosition) !== position) {
      refChildren.current.style.position = position
    }

    if (verticalPosition === VERTICAL_POSITION.BOTTOM) {
      const topPositionBottom = position === ALLOWED_POSITIONS.FIXED ? verticalBottomPosition : verticalBottomPositionAbsolute

      switch (horizontalPosition) {
        case HORIZONTAL_POSITION.LEFT:
          return {
            bottom: "auto",
            left: parentLeft,
            position,
            right: "auto",
            top: topPositionBottom,
          }
        case HORIZONTAL_POSITION.RIGHT:
          return {
            bottom: "auto",
            left: "auto",
            position,
            right: horizontalRightPosition,
            top: topPositionBottom,
          }
        case HORIZONTAL_POSITION.CENTER:
          return {
            bottom: "auto",
            left: horizontalCenterPosition,
            position,
            right: "auto",
            top: topPositionBottom,
          }
        case HORIZONTAL_POSITION.CALCULATED:
          return {
            bottom: "auto",
            left: horizontalCalculatedPosition,
            position,
            right: "auto",
            top: topPositionBottom,
          }
      }
    }

    if (verticalPosition === VERTICAL_POSITION.TOP) {
      const topPosition = position === ALLOWED_POSITIONS.FIXED ? verticalTopPosition : verticalTopPositionAbsolute

      switch (horizontalPosition) {
        case HORIZONTAL_POSITION.LEFT:
          return {
            bottom: "auto",
            left: parentLeft,
            position,
            right: "auto",
            top: topPosition,
          }
        case HORIZONTAL_POSITION.RIGHT:
          return {
            bottom: "auto",
            left: "auto",
            position,
            right: horizontalRightPosition,
            top: topPosition,
          }
        case HORIZONTAL_POSITION.CENTER:
          return {
            bottom: "auto",
            left: horizontalCenterPosition,
            position,
            right: "auto",
            top: topPosition,
          }
        case HORIZONTAL_POSITION.CALCULATED:
          return {
            bottom: "auto",
            left: horizontalCalculatedPosition,
            position,
            right: "auto",
            top: topPosition,
          }
      }
    }
  }

  return {}
}
