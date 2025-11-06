import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { ExpertiseSwitch } from "../ExpertiseSwitch/ExpertiseSwitch"

import "./styles.scss"

export const ExpertisePage: React.FC = () => (
  <Flex className="selection-page" gap={16} vertical>
    <ExpertiseSwitch />
  </Flex>
)
