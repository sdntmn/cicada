import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { ClaimTable } from "../InitialDataTable/ClaimTable"

import "./styles.scss"

export const CourtPage: React.FC = () => (
  <Flex className="pre-trial-recovery-page" gap={16}>
    <ClaimTable
      onDetailOpen={function (detail: { component: React.ComponentType; props?: any; subSection: string }): void {
        throw new Error("Function not implemented.")
      }}
      onNavigateToItem={function (target: { itemId: string; section: Menu; subSection: string }): void {
        throw new Error("Function not implemented.")
      }}
      navigationMode={"main"}
    />
  </Flex>
)
