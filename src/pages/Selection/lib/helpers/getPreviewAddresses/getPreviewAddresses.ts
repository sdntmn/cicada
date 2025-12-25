import type { PremisesOption } from "@/shared/lib/types/types"

export const getPreviewAddresses = (houses: PremisesOption[]): string[] => houses.map((house) => house.name)
