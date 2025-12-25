import { MutableRefObject, Ref, RefCallback } from "react"

export const mergeRefs =
  <T>(...refs: (undefined | Ref<T> | null)[]): RefCallback<T> =>
  (value: null | T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        ;(ref as MutableRefObject<null | T>).current = value
      }
    }
  }
