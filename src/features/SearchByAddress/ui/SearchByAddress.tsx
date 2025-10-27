import React from "react"

import { SearchField } from "itpc-ui-kit"

export const SearchByAddress: React.FC = () => (
  <SearchField
    onChange={() => {
      console.info(" сеарч")
    }}
    items={[]}
  />
)
