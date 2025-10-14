import React from "react"

import { SearchField } from "itpc-ui-kit"

import "./styles.scss"

export const SearchByAccount: React.FC = () => (
  <SearchField
    onChange={() => {
      console.info(" сеарч")
    }}
    className="search-by-account"
    items={[]}
  />
)
