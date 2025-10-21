import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"

import "./styles.scss"

interface Props {
  className?: string
  density: RowDensity
}

export const LineHeightIcon: React.FC<Props> = ({ className, density }) => (
  <div className={cn("density-icon", `density-icon__${density}`, className)}>
    <span className="density-icon__line" />
    <span className="density-icon__line" />
    <span className="density-icon__line" />
  </div>
)
