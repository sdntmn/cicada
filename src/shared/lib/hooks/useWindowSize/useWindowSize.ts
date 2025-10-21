import { useEffect, useState } from "react"

interface WindowSize {
  windowHeight: number
  windowWidth: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      })
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}
