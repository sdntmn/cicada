import { ReactNode } from "react"

import { createPortal } from "react-dom"

interface Props {
  children: ReactNode
  element?: HTMLElement
}

export const Portal = ({ children, element }: Props) => {
  if (!element) {
    throw new Error("Container element is not provided")
  }
  return createPortal(children, element)
}
