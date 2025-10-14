import { memo, ReactElement } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./StickyContentLayout.module.scss"

interface Props {
  className?: string
  content: ReactElement
  left?: ReactElement
  right?: ReactElement
}

export const StickyContentLayout = memo((props: Props) => {
  const { className, content, left, right } = props

  return (
    <div className={cn("sticky-layout", [className])}>
      {left && <div className="sticky-layout__left">{left}</div>}
      <div className="sticky-layout__content">{content}</div>
      {right && <div className="sticky-layout__right">{right}</div>}
    </div>
  )
})

StickyContentLayout.displayName = "StickyContentLayout"
