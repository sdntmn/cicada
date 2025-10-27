import React from "react"

import "./styles.scss"

export interface Props {
  className?: string
  id?: string
  max?: number
  min?: number
  name?: string
  onChange: (value: number) => void
  step?: number
  value: number
}

export const Slider: React.FC<Props> = ({ className, id, max = 100, min = 0, name, onChange, step = 1, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <input
      className={className ? `${className} slider` : "slider"}
      id={id}
      max={max}
      min={min}
      name={name}
      onChange={handleChange}
      step={step}
      type="range"
      value={value}
    />
  )
}
