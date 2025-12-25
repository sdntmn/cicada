import React from "react"

import cn from "classnames"

import { arrowLongIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import type { InitialData } from "../../lib/types/analysisTypes"

import "./styles.scss"

interface Props {
  onGoToClaim?: (debtor: InitialData) => void
  onGoToPreparationCourt?: (debtor: InitialData) => void
  rowData: InitialData
}

export const CellStage: React.FC<Props> = ({ onGoToClaim, onGoToPreparationCourt, rowData }) => {
  const handleGoToClaim = () => {
    onGoToClaim(rowData)
  }

  const handleGoToPreparationCourt = () => {
    onGoToPreparationCourt(rowData)
  }

  return (
    <Flex className="stage-cell" gap={2} justify="center" vertical>
      <button className="stage-cell__btn" onClick={handleGoToClaim}>
        <Icon className={cn(arrowLongIcon, "stage-cell__icon")} title="Следующая стадия" />{" "}
        <span
          className="stage-cell__btn-label
        "
        >
          в претензии
        </span>
      </button>
      <button className="stage-cell__btn" onClick={handleGoToPreparationCourt}>
        <Icon className={cn(arrowLongIcon, "stage-cell__icon")} title="Следующая стадия" />
        <span className="stage-cell__btn-label">в подготовку</span>
      </button>
    </Flex>
  )
}
