import React, { HTMLAttributes, type RefObject, useEffect, useRef, useState } from "react"

import cn from "classnames"
import { KeyCode, useAnimation, useMouseMovement } from "itpc-ui-kit"
import { DurationAnimation, Item } from "itpc-ui-kit/dist/components/types"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { useKeyboardNavigation } from "@/shared/lib/helpers/useKeyboardNavigation"
import { useOnClickOutside } from "@/shared/lib/hooks"
import { updateScroll } from "@/shared/lib/hooks/updateScroll"
import { useHoveredIndex } from "@/shared/lib/hooks/useHoveredIndex"
import { IconArrow } from "@/shared/ui/IconArrow"
import { ListBox } from "@/shared/ui/ListBox"
import { Placeholder } from "@/shared/ui/Placeholder"
import { Portal } from "@/shared/ui/Portal"
import { PositionedWrap } from "@/shared/ui/PositionedWrap"
import { SelectItem } from "@/shared/ui/SelectItem"

import "./styles.scss"

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Дополнительный класс */
  className?: string
  /** Отключение компонента */
  disabled?: boolean
  /** Задержка анимации */
  durationAnimation?: DurationAnimation
  /** Список элементов */
  items: Item[]
  /** Обработчик изменения значения */
  onChange(values: string[]): void
  /** Подпись */
  placeholder?: string
  /** Выбранные элементы */
  selectedItems?: string[]
}

export const MultiSelectField: React.FC<Props> = ({
  className,
  disabled = false,
  durationAnimation = {
    durationClose: 200,
    durationOpen: 300,
  },
  items,
  onChange,
  placeholder = "",
  selectedItems = [],
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isClosing } = useAnimation(isOpen, durationAnimation)

  const ref = useRef<HTMLDivElement>(null)
  const refButton = useRef<HTMLButtonElement>(null)
  const refChildren = useRef<HTMLUListElement>(null)

  const onClose = (): void => {
    setIsOpen(false)
  }

  const handleOpen = (): void => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const onChangeValue = (value: string): void => {
    if (typeof onChange === "function") {
      const select = new Set<string>(selectedItems)
      console.log(select)

      if (select.has(value)) {
        select.delete(value)
      } else {
        select.add(value)
      }

      onChange(Array.from(select))
    }
  }

  const selectText = (): string => {
    if (selectedItems?.length > 1) {
      return `Выбрано ${selectedItems?.length} элементов`
    }

    if (selectedItems?.length === 1) {
      return items.find((item) => item.id === selectedItems[0])?.value ?? ""
    }

    return ""
  }

  const { activeIndex, handleKeyUpAndDown, setActiveIndex } = useKeyboardNavigation(items)

  const { isMouseMoved, setIsMouseMoved } = useMouseMovement(refChildren)

  const hoveredIndex = useHoveredIndex(refChildren, items)

  const handleMouseSelection = (value: string) => {
    onChangeValue(value)
    setIsMouseMoved(false)
    const index = items.findIndex((item) => item.id === value)
    setActiveIndex(index)
    refButton.current?.focus()
  }

  const onMouseEnter = (index: number): void => {
    if (isMouseMoved) {
      setActiveIndex(index)
    }
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.preventDefault()
    onChangeValue(items[activeIndex]?.id)
  }

  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      return
    }

    if (isMouseMoved) {
      setIsMouseMoved(false)
    }
    switch (event.key) {
      case KeyCode.ARROW_UP:
      case KeyCode.ARROW_DOWN:
        handleKeyUpAndDown(event)
        break

      case KeyCode.ENTER:
        handleEnterKey(event)
        break

      default:
        break
    }
  }

  const handleContainerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }

    if (!isOpen && event.key === KeyCode.ENTER) {
      handleOpen()
      return
    }

    handleKey(event)
  }

  useEffect(() => {
    if (refChildren && activeIndex !== -1) {
      updateScroll(refChildren, activeIndex)
    }
  }, [activeIndex, refChildren])

  useEffect(() => {
    if (!!selectedItems.length && isOpen) {
      setActiveIndex(
        selectedItems
          ? items.findIndex(({ id }) => id === selectedItems[selectedItems.length - 1])
          : (items.findIndex((item) => !item.disabled) ?? 0)
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (isMouseMoved) {
      const isDisabledItem = items.find((_, index) => hoveredIndex === index)?.disabled

      if (!isDisabledItem && typeof hoveredIndex === "number" && hoveredIndex >= 0 && hoveredIndex !== activeIndex) {
        setActiveIndex(hoveredIndex)
      }
    }
  }, [isMouseMoved])

  useOnClickOutside(ref, onClose, isOpen, refChildren as RefObject<HTMLElement>)

  return (
    <div
      {...rest}
      className={cn(
        "itpc-multi-select",
        disabled && " itpc-multi-select_disabled",
        !disabled && " itpc-multi-select_hover",
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onKeyDown={handleContainerKeyDown}
      ref={ref}
      role="combobox"
      tabIndex={disabled ? -1 : 0}
    >
      <button
        className={cn("itpc-multi-select__button", isOpen && "itpc-multi-select__button_focused")}
        disabled={disabled}
        onClick={handleOpen}
        ref={refButton}
        type="button"
      >
        <Placeholder disabled={disabled} focused={isOpen || !!selectedItems?.length}>
          {placeholder}
        </Placeholder>

        {selectText()}
      </button>

      <IconArrow disabled={disabled} onClick={handleOpen} orientation={isOpen ? "top" : "bottom"} />

      <Portal element={document.body}>
        <PositionedWrap horizontalAlignment={HORIZONTAL_POSITION.LEFT} isClosing={isClosing} isOpen={isOpen} refParent={ref}>
          <ListBox
            durationAnimation={durationAnimation}
            isOpen={isOpen ? !isClosing : isOpen}
            refChildren={refChildren}
            refParent={ref}
          >
            {items.map((item, itemIndex) => (
              <SelectItem
                activeIndex={activeIndex}
                disabled={item.disabled}
                id={item.id}
                isActive={selectedItems?.includes(item.id) ?? false}
                itemIndex={itemIndex}
                key={item.id}
                onChange={handleMouseSelection}
                onMouseEnter={onMouseEnter}
              >
                {item.value}
              </SelectItem>
            ))}
          </ListBox>
        </PositionedWrap>
      </Portal>
    </div>
  )
}
