import { DocumentDimensions, ElementDimensions, ParentDimensions } from "@/shared/constants"

export const getDocumentDimensions = (): DocumentDimensions => ({
  documentHeight: document.documentElement.clientHeight,
  documentWidth: document.documentElement.clientWidth,
})

export const getParentDimensions = (ref: HTMLDivElement): ParentDimensions => {
  const rect: DOMRect = ref.getBoundingClientRect()
  return {
    parentBottom: rect.bottom,
    parentHeight: rect.height,
    parentLeft: rect.left,
    parentTop: rect.top,
    parentWidth: rect.width,
  }
}

export const getElementDimensions = (ref: HTMLUListElement | HTMLDivElement): ElementDimensions => ({
  elementHeight: ref.offsetHeight,
  elementWidth: ref.offsetWidth,
})
