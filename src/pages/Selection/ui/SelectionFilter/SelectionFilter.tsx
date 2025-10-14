import React, { useEffect, useState } from "react"

import { Checkbox, TextField, Typography } from "itpc-ui-kit"

import { getUser } from "@/entities/User"
import { useAppDispatch } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"
type SearchMode = "any" | "all"
export const SelectionFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchMode, setSearchMode] = useState<SearchMode>("any")

  const handleModeChange = (mode: SearchMode) => () => {
    setSearchMode(mode)
  }
  useEffect(() => {
    dispatch(getUser("1"))
  }, [])

  return (
    <Flex vertical>
      <Typography.Text>Задолженность более</Typography.Text>
      <Flex>
        <Flex className="selection-page__filters" gap={8} vertical>
          <TextField id={"sum"} name={"sum"} placeholder="сумма / руб." />
          <TextField id={"term"} name={"term"} placeholder="срок / мес." />
        </Flex>
        <Flex className="selection-page__filters" gap={8} role="radiogroup" vertical>
          <Checkbox
            id="search-any"
            isChecked={searchMode === "any"}
            label="Любое из условий"
            labelPosition="right"
            name="search-mode"
            onClick={handleModeChange("any")}
            variant="round"
          />
          <Checkbox
            id="search-all"
            isChecked={searchMode === "all"}
            label="Все условия"
            labelPosition="right"
            name="search-mode"
            onClick={handleModeChange("all")}
            variant="round"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
