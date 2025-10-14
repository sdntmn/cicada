import React, { memo } from "react"

interface Props {
  className?: string
}

export const Icon: React.FC<Props> = memo(function Icon({ className }) {
  return <i className={className} />
})
