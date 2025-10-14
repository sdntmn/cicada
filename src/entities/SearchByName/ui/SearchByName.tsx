import React from "react"

import { SearchField } from "itpc-ui-kit"

import "./styles.scss"

export const SearchByName: React.FC = () => (
  <SearchField
    onChange={() => {
      console.info(" сеарч")
    }}
    className="search-by-name"
    items={[]}
  />
)
