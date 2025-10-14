import { useState } from "react"

import { useWindowSize } from "itpc-ui-kit"

import { browser, WIDTH } from "../../../constants"

export const useIsMobile = (): boolean => {
  const { windowWidth } = useWindowSize()
  const [windowsSize, setWindowsSize] = useState<number>(windowWidth)
  let isMobile: boolean = browser.test(navigator.userAgent) || windowWidth < WIDTH.SCREEN_800

  if (windowWidth !== windowsSize) {
    isMobile = browser.test(navigator.userAgent) || windowWidth < WIDTH.SCREEN_800
    setWindowsSize(windowWidth)
  }

  return isMobile
}
