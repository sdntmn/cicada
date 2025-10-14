import React, { useEffect } from "react"

import { Button, Pagination } from "itpc-ui-kit"

import { getUser } from "@/entities/User"
import { SwitchingSearch } from "@/features/SwitchingSearch"
import { useAppDispatch } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { Table } from "@/widgets/Table"

import { SelectionFilter } from "../SelectionFilter/SelectionFilter"

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
        <SelectionFilter />
        <Button className="selection-page__btn-search"> Поиск </Button>
      </Flex>
      <Table />
      <Pagination callback={() => console.info("Пагинация")} dataLength={1000} />
    </Flex>
  )
}
