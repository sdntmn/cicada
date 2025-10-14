import React from "react"

import cn from "classnames"

import { ColProps, RowProps } from "./index"

export const generateColClassList = (props: ColProps): string =>
  cn("itpc-col", props.col && !props.flex && `itpc-col-${props.col}`, props.className)

export const generateColStyle = (props: ColProps, gap?: [number, number] | number): React.CSSProperties => {
  let style: React.CSSProperties = {}

  if (gap) {
    if (Array.isArray(gap) && gap.length === 2) {
      style.paddingLeft = `${gap[1] / 2}px`
      style.paddingRight = `${gap[1] / 2}px`
    } else if (Number.isInteger(gap)) {
      style.paddingLeft = `${(gap as number) / 2}px`
      style.paddingRight = `${(gap as number) / 2}px`
    }
  }

  if (props.order) {
    style.order = props.order
  }

  if (props.flex) {
    if (Number.isInteger(props.flex)) {
      style.flex = `${props.flex} ${props.flex} auto`
    } else {
      style.flex = props.flex
    }
  }

  if (props.style) {
    style = { ...style, ...props.style }
  }

  return style
}

export const generateRowClassList = (props: RowProps): string =>
  cn(
    "itpc-row",
    !props.wrap && "itpc-row-no_wrap",
    props.align && `itpc-row-align_${props.align}`,
    props.justify && `itpc-row-justify_${props.justify}`,
    props.className
  )

export const generateRowStyle = (props: RowProps): React.CSSProperties => {
  let style: React.CSSProperties = {}

  if (props.gap) {
    if (Array.isArray(props.gap) && props.gap.length === 2) {
      style.rowGap = `${props.gap[0]}px`
      style.marginLeft = `-${(props.gap[0] as number) / 2}px`
      style.marginRight = `-${(props.gap[0] as number) / 2}px`
    } else if (Number.isInteger(props.gap)) {
      style.rowGap = `${props.gap}px`
      style.marginLeft = `-${(props.gap as number) / 2}px`
      style.marginRight = `-${(props.gap as number) / 2}px`
    }
  }

  if (props.style) {
    style = { ...style, ...props.style }
  }

  return style
}
