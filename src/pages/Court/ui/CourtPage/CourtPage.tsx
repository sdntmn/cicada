import React from "react"

import { Typography } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const CourtPage: React.FC = () => (
  <Flex className="archive-page" gap={16} vertical>
    <Typography.Title>Суд</Typography.Title>
  </Flex>
)
