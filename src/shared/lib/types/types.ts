import { type HORIZONTAL_POSITION, PAGE_SIZES, type VERTICAL_POSITION } from "@/shared/constants"

export interface Contact<T> {
  confirmed: boolean
  oid: T
}

export interface Mobile extends Contact<number> {
  __brand: "mobile"
}

export interface Email extends Contact<string> {
  __brand: "email"
}

export interface DurationAnimation {
  durationClose?: number
  durationOpen?: number
}

export type PageSize = (typeof PAGE_SIZES)[number]

export type PositionType = "absolute" | "fixed"

export type FontSize = "normal" | "xlarge" | "small" | "large"

export interface GetHorizontalPositionArg {
  defaultParentWidth?: number
  distanceRight: number
  documentWidth: number
  elementWidth: number
  parentLeft: number
  parentWidth: number
  scrollbarWidth: number
}

export interface DocumentDimensions {
  documentHeight: number
  documentWidth: number
}

export interface ParentDimensions {
  parentBottom: number
  parentHeight: number
  parentLeft: number
  parentTop: number
  parentWidth: number
}

export interface PremisesOption {
  id: string
  name: string
}

export interface TooltipPositionConfig {
  horizontal: HORIZONTAL_POSITION
  vertical: VERTICAL_POSITION
}

export type TooltipPosition = "bottom" | "right" | "left" | "top"
export type ChipSize = "md" | "sm" | "lg"
export type ChipVariant = "outline" | "default" | "filled" | "ghost"
export type BadgeVariant = "overflow" | "default" | "success" | "warning" | "counter" | "danger" | "info"
export type BadgeSize = "md" | "sm" | "lg"
