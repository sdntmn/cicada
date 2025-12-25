import React from "react"

import { SearchField } from "itpc-ui-kit"

import { SearchButton } from "@/pages/Selection/ui/SearchButton/SearchButton"
import { SearchHistoryButton } from "@/pages/Selection/ui/SearchHistoryButton/SearchHistoryButton"
import { useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export const SearchByAccount: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.premises)
  const search = () => {
    console.info("SearchByAccount")
  }
  const isDisabled = isLoading
  return (
    <>
      <SearchHistoryButton />

      <SearchField
        onChange={() => {
          console.info(" сеарч")
        }}
        className="search-by-account"
        items={[]}
      />
      <SearchButton disabled={isDisabled} onPress={search} />
    </>
  )
}
