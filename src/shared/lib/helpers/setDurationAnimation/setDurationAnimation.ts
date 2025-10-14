export interface DurationAnimation {
  durationClose?: number
  durationOpen?: number
}

export const setDurationAnimation = (durationAnimation: DurationAnimation, element: HTMLElement | null, isOpen: boolean) => {
  if (!element) {
    return
  }

  if (isOpen) {
    if (durationAnimation.durationOpen !== 0) {
      element.style.transitionDuration = `${durationAnimation.durationOpen}ms`
    }
  } else {
    if (durationAnimation.durationClose !== 0) {
      element.style.transitionDuration = `${durationAnimation.durationClose}ms`
    }
  }
}
