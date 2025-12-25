import React from "react"

import { SearchField } from "itpc-ui-kit"

import { SearchButton } from "@/pages/Selection/ui/SearchButton/SearchButton"
import { SearchHistoryButton } from "@/pages/Selection/ui/SearchHistoryButton/SearchHistoryButton"
import { useAppSelector } from "@/shared/lib/store"

import "./styles.scss"

export const SearchByAddress: React.FC = () => {
  console.info("SearchByAddress")
  const { isLoading } = useAppSelector((state) => state.premises)
  const search = () => {
    console.info("SearchByAddress")
  }
  const isDisabled = isLoading
  return (
    <>
      <SearchHistoryButton />

      <SearchField
        onChange={() => {
          console.info(" сеарч")
        }}
        className="search-by-address"
        items={[]}
      />
      <SearchButton disabled={isDisabled} onPress={search} />
    </>
  )
}
