import React from "react"

import { Button } from "@/shared/ui/Button"
import { Chip } from "@/shared/ui/Chip"

import "./styles.scss"
import { Badge } from "@/shared/ui/Badge/ui/Badge"

interface Props {
  addresses: string[]
  maxInTooltip?: number

  tagClassName?: string
  visibleCount?: number
}

export const AddressTooltipContent: React.FC<Props> = ({
  addresses,
  maxInTooltip = 20,

  tagClassName,
  visibleCount = 2,
}) => {
  if (addresses.length <= visibleCount) {
    return (
      <>
        {addresses.map((addr, i) => (
          <Badge className={tagClassName} key={i}>
            {addr}
          </Badge>
        ))}
      </>
    )
  }

  const hidden = addresses.slice(visibleCount)
  const displayed = hidden.slice(0, maxInTooltip)
  const overflow = hidden.length - maxInTooltip

  return (
    <>
      {displayed.map((addr, index) => (
        <Badge className="address-tooltip__tag" key={index} variant="default">
          {addr}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge className="address-tooltip__tag" variant="default">
          +{overflow}
        </Badge>
      )}
    </>
  )
}
