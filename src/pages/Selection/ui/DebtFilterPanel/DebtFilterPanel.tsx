// DebtFilterPanel.tsx
import React, { useRef, useState } from "react"

import cn from "classnames"

import { FilterMode } from "@/shared/api/DebtorApi"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { formatInteger, parseDebtValue, parseTermValue } from "@/shared/lib/helpers"
import { PositionPortal } from "@/shared/ui/PositionPortal"
import { Tooltip } from "@/shared/ui/Tooltip"

import { STEP, SUM, TERM } from "../../lib/constants"
import { DebtFilter } from "../DebtFilter/DebtFilter"
import { FilterButton } from "../FilterButton/FilterButton"

import "./styles.scss"

interface Props {
  filterMode: FilterMode
  onChangeMode: (mode: FilterMode) => void
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  onClearSum: () => void
  onClearTerm: () => void
  onPaymentChange?: (value: string[]) => void
  onServicesChange?: (value: string[]) => void
  sumValue: string
  termValue: string
}

export const DebtFilterPanel: React.FC<Props> = ({
  filterMode,
  onChangeMode,
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  onClearSum,
  onClearTerm,
  sumValue,
  termValue,
}) => {
  const sumBtnRef = useRef<HTMLButtonElement>(null)
  const termBtnRef = useRef<HTMLButtonElement>(null)
  const servicesBtnRef = useRef<HTMLButtonElement>(null)
  const paymentBtnRef = useRef<HTMLButtonElement>(null)

  const [isSumOpen, setIsSumOpen] = useState(false)
  const [isTermOpen, setIsTermOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const parsedSum = parseDebtValue(sumValue)
  const hasSum = parsedSum > 0
  const parsedTerm = parseTermValue(termValue)
  const hasTerm = parsedTerm > 0
  const hasBoth = hasSum && hasTerm

  const toggleFilterMode = () => {
    if (!hasBoth) {
      return
    }
    onChangeMode(filterMode === FilterMode.ALL ? FilterMode.ANY : FilterMode.ALL)
  }

  const renderStub = (text: string) => <div className="debt-filter-panel__stub">{text}</div>

  return (
    <>
      {/* Сумма */}
      <Tooltip
        content="Искать должников с долгом от указанной суммы"
        disabled={isSumOpen}
        ref={sumBtnRef}
        title="Фильтр по сумме долга"
      >
        <FilterButton
          onClear={(e) => {
            e.stopPropagation()
            onClearSum()
            setIsSumOpen(false)
          }}
          clearable={hasSum}
          isActive={hasSum}
          isOpen={isSumOpen}
          onClick={() => setIsSumOpen((p) => !p)}
        >
          {hasSum ? `${formatInteger(parsedSum)} ₽` : "Сумма"}
        </FilterButton>
      </Tooltip>

      <PositionPortal
        anchorRef={sumBtnRef}
        className="debt-filter-panel__content"
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.CENTER}
        isOpen={isSumOpen}
        onClose={() => setIsSumOpen(false)}
      >
        <DebtFilter
          id="sum-popup"
          label="Сумма / руб."
          max={SUM.MAX}
          min={SUM.MIN}
          onChangeSlider={onChangeSumSlider}
          onChangeText={onChangeSum}
          step={STEP.SUM}
          value={sumValue}
        />
      </PositionPortal>

      {/* Логика */}
      <Tooltip content="Фильтр: «и» — оба условия, «или» — хотя бы одно">
        <FilterButton
          className={cn("debt-filter-panel__btn-mode", filterMode === FilterMode.ALL && "debt-filter-panel__btn-mode_all")}
          disabled={!hasBoth}
          isActive={hasBoth}
          onClick={toggleFilterMode}
        >
          {filterMode === FilterMode.ALL ? "и" : "или"}
        </FilterButton>
      </Tooltip>

      {/* Срок */}
      <Tooltip content="Фильтр: искать с долгом дольше указанного срока" disabled={isTermOpen} ref={termBtnRef}>
        <FilterButton
          onClear={(e) => {
            e.stopPropagation()
            onClearTerm()
            setIsTermOpen(false)
          }}
          className="debt-filter-panel__btn-term"
          clearable={hasTerm}
          isActive={hasTerm}
          isOpen={isTermOpen}
          onClick={() => setIsTermOpen((p) => !p)}
        >
          {hasTerm ? `${parsedTerm} мес.` : "Срок"}
        </FilterButton>
      </Tooltip>
      <PositionPortal
        anchorRef={termBtnRef}
        className="debt-filter-panel__content"
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.CENTER}
        isOpen={isTermOpen}
        onClose={() => setIsTermOpen(false)}
      >
        <DebtFilter
          id="term-popup"
          label="Срок / мес."
          max={TERM.MAX}
          min={TERM.MIN}
          onChangeSlider={onChangeTermSlider}
          onChangeText={onChangeTerm}
          step={STEP.TERM}
          // title="Задолженность более"
          value={termValue}
        />
      </PositionPortal>

      {/* Услуги */}
      <Tooltip content="Фильтр: выбор вида услуг" disabled={isServicesOpen} ref={servicesBtnRef}>
        <FilterButton onClick={() => setIsServicesOpen((p) => !p)}>Услуги</FilterButton>
      </Tooltip>

      <PositionPortal
        anchorRef={servicesBtnRef}
        className="debt-filter-panel__content"
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.CENTER}
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
      >
        {renderStub("Фильтр по услугам")}
      </PositionPortal>

      {/* Оплата */}
      <Tooltip content="Фильтр: по отсутствию оплат свыше выбранного срока" disabled={isPaymentOpen} ref={paymentBtnRef}>
        <FilterButton onClick={() => setIsPaymentOpen((p) => !p)}>Оплата</FilterButton>
      </Tooltip>

      <PositionPortal
        anchorRef={paymentBtnRef}
        className="debt-filter-panel__content"
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.CENTER}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      >
        {renderStub("Фильтр по оплате")}
      </PositionPortal>
    </>
  )
}
