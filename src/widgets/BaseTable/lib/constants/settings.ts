import { FontSize, RowDensity } from "@/shared/constants"

export const DENSITY_DISPLAY_ORDER: RowDensity[] = [RowDensity.SMALL, RowDensity.MEDIUM, RowDensity.LARGE, RowDensity.X_LARGE]

export const FONT_SIZE_DISPLAY_ORDER: FontSize[] = ["small", "normal", "large", "xlarge"]

export const FONT_SIZE_LABELS: Record<FontSize, string> = {
  large: "Крупный",
  normal: "Обычный",
  small: "Мелкий",
  xlarge: "Очень крупный",
}
