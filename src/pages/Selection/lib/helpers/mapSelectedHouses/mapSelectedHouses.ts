import { HouseItem } from "@/entities/House"

import { HouseOption } from "../../types/types"

export const mapSelectedHouses = (houses: HouseItem[], selectedIds: string[]): HouseOption[] => {
  const houseMap = new Map(houses.map((h) => [h.id, h]))
  return selectedIds
    .map((id) => {
      const house = houseMap.get(id)
      return house ? { id, name: `${house.street}, ${house.house}` } : null
    })
    .filter(Boolean) as HouseOption[]
}
