// GlobalSearchModal.tsx
import React, { useState } from "react"

import cn from "classnames"
import { Modal, ModalContent, SearchField } from "itpc-ui-kit"

import { closeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"

import "./styles.scss"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const GlobalSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ cases: any[]; debtors: any[] }>({ cases: [], debtors: [] })

  const handleSelect = (url: string) => {
    onClose()
    window.location.href = url
  }

  return (
    <Modal
      iconClose={
        <button className="global-search-modal__btn-close" onClick={onClose}>
          <Icon className={cn("global-search-modal__btn-close-icon", closeIcon)} />
        </button>
      }
      className="global-search-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Глобальный поиск"
    >
      <ModalContent className="global-search-modal__content">
        <SearchField
          onChange={() => {
            console.info(" сеарч")
          }}
          className={"global-search-input"}
          items={[]}
          placeholder="Введите ФИО, адрес, номер дела..."
        />
        <div className="search-results">
          <h4>Должники ({results.debtors.length})</h4>
          {results.debtors.map((d) => (
            <div key={d.id} onClick={() => handleSelect(d.url)}>
              {d.fullName} — {d.address}
            </div>
          ))}

          <h4>Дела ({results.cases.length})</h4>
          {results.cases.map((c) => (
            <div key={c.id} onClick={() => handleSelect(c.url)}>
              {c.caseNumber} — {c.debtorName}
            </div>
          ))}
        </div>
      </ModalContent>
    </Modal>
  )
}
