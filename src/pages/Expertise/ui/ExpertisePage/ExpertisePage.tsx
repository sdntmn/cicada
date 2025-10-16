import React from "react"

import { Pagination } from "itpc-ui-kit"

import { SwitchingStagePreCourt } from "@/features/SwitchingStagePreCourt"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const ExpertisePage: React.FC = () => (
  <Flex className="selection-page" gap={16} vertical>
    <SwitchingStagePreCourt />
    <Pagination callback={() => console.info("Пагинация")} dataLength={1000} />
  </Flex>
)
