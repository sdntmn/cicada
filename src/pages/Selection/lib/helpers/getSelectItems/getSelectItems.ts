import { Item } from "itpc-ui-kit"

import { HouseItem } from "@/entities/House"

export const getSelectItems = (houses: HouseItem[]): Item[] =>
  houses.map((house) => ({
    id: house.id,
    value: `${house.city}, ${house.street}, ${house.house}`,
  }))
