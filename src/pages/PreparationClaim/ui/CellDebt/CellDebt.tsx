import React from "react"

import { formatCurrency, parseDebtValue } from "@/shared/lib/helpers"
import { Flex } from "@/shared/ui/layout/Flex"

import type { InitialData } from "../../lib/types/initialDataTypes"

interface Props {
  rowData: InitialData
}

export const CellDebt: React.FC<Props> = ({ rowData }) => (
  <Flex gap={8} vertical>
    {formatCurrency(parseDebtValue(rowData.debt))}
    {formatCurrency(parseDebtValue(rowData.penalty))}
  </Flex>
)
