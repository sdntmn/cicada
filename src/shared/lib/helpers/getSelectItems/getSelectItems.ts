import { Item } from "itpc-ui-kit"

import { PremisesItem } from "@/entities/Premises"

export const getSelectItems = (houses: PremisesItem[]): Item[] =>
  houses.map((house) => ({
    id: house.id,
    value: `${house.city}, ${house.street}, ${house.house}`,
  }))
