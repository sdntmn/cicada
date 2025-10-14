import React, { useEffect, useRef, useState } from "react"

import cn from "classnames"
import { useWindowSize } from "itpc-ui-kit"
import { CSSPropertiesWithTransformOrigin } from "itpc-ui-kit/dist/components/types"

import { getTransformOriginByAxisX } from "@/shared/lib/helpers/getTransformOriginByAxisX/getTransformOriginByAxisX"
import { DurationAnimation, setDurationAnimation } from "@/shared/lib/helpers/setDurationAnimation/setDurationAnimation"

import "./styles.scss"

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
  durationAnimation: DurationAnimation
  isOpen: boolean
  refChildren?: React.RefObject<HTMLUListElement>
  refParent?: React.RefObject<HTMLDivElement>
}

export const ListBox: React.FC<Props> = ({ children, durationAnimation, isOpen, refChildren, refParent, ...rest }) => {
  const { windowWidth } = useWindowSize()
  const localRef = useRef<HTMLUListElement>(null)

  const ref = refChildren || localRef

  const [styleAnimation, setStyleAnimation] = useState<CSSPropertiesWithTransformOrigin>({})

  useEffect(() => {
    const element = ref.current
    const parentElement = refParent?.current

    if (element && parentElement) {
      element.style.width = `${parentElement.offsetWidth}px`
      setDurationAnimation(durationAnimation, element, isOpen)
    }
  }, [durationAnimation, ref, refParent, windowWidth, isOpen])

  useEffect(() => {
    const element = ref.current
    const parentElement = refParent?.current

    if (isOpen && parentElement && element) {
      const animationTransform = getTransformOriginByAxisX(refParent, ref)
      setStyleAnimation({ transformOrigin: animationTransform })
    }
  }, [isOpen, refParent, ref])

  return (
    <ul
      className={cn("itpc-list-box", isOpen ? "itpc-list-box_opened" : "itpc-list-box_closed")}
      ref={refChildren || localRef}
      role="listbox"
      style={styleAnimation}
      {...rest}
    >
      {children}
    </ul>
  )
}
