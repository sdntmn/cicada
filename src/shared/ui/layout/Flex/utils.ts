import cn from "classnames"

import { FlexProps } from "./index"

export const generateClassList = (props: Omit<FlexProps, "children">): string =>
  cn(
    "itpc-flex",
    props.vertical && "itpc-flex_direction_vertical",
    props.wrap && `itpc-flex_wrap_${props.wrap}`,
    props.justify && `itpc-flex_justify_${props.justify}`,
    props.align && `itpc-flex_align_${props.align}`,
    props.className
  )
