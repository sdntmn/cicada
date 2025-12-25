import React from "react"

import cn from "classnames"
import { Button } from "itpc-ui-kit"

import { searchIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"

import "./styles.scss"

export interface SearchButtonProps {
  disabled?: boolean
  onPress: () => void
}

export const SearchButton: React.FC<SearchButtonProps> = ({ disabled = false, onPress }) => (
  <Button className="search-button" disabled={disabled} onPress={onPress}>
    <Icon className={cn(searchIcon, "search-button__icon")} />
  </Button>
)
