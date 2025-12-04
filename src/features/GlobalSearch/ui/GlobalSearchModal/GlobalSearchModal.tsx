// GlobalSearchModal.tsx
import React, { useEffect, useState } from "react"

import { Modal, ModalContent, useDebounce } from "itpc-ui-kit"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const GlobalSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ cases: any[]; debtors: any[] }>({ cases: [], debtors: [] })
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      fetch(`/api/v1/search?q=${encodeURIComponent(debouncedQuery)}`)
        .then((res) => res.json())
        .then(setResults)
    } else {
      setResults({ cases: [], debtors: [] })
    }
  }, [debouncedQuery])

  const handleSelect = (url: string) => {
    onClose()
    // Используйте ваш роутер (React Router, etc.)
    window.location.href = url // или navigate(url)
  }

  return (
    <Modal
      className="global-search-modal"
      iconClose={<i className="fa-regular fa-xmark" onClick={onClose} />}
      isOpen={isOpen}
      onClose={onClose}
      title="Глобальный поиск"
    >
      <ModalContent>
        <input
          className="global-search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите ФИО, адрес, номер дела..."
          value={query}
          autoFocus
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
