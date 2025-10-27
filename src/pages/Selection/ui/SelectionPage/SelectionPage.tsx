import React, { useEffect } from "react"

import { getUser } from "@/entities/User"
import { SwitchingSearch } from "@/features/SwitchingSearch"
import { useAppDispatch } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { Table } from "@/widgets/Table"

import "./styles.scss"

export const SelectionPage: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser("1"))
  }, [])

  return (
    <Flex className="selection-page" gap={16} vertical>
      <Flex className="selection-page__wrap" gap={32}>
        <SwitchingSearch />
      </Flex>
      <Table />
    </Flex>
  )
}
