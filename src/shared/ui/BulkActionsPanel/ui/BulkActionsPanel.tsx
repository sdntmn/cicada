// src/pages/Selection/ui/BulkActionsPanel/BulkActionsPanel.tsx

import React from "react"

import { Button } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export interface Props {
  onClearSelection: () => void
  onDelete?: () => void
  onExport?: () => void
  onMoveNext?: () => void
  onMoveToCandidates?: () => void
  selectedRow: Set<string | number>
}

export const BulkActionsPanel: React.FC<Props> = ({
  onClearSelection,
  onDelete,
  onExport,
  onMoveNext,
  onMoveToCandidates,
  selectedRow,
}) => (
  <>
    {selectedRow?.size > 0 && (
      <Flex align="center" className="bulk-actions-panel" gap={16}>
        <span className="bulk-actions-panel__text">
          Выбрано: <strong>{selectedRow?.size}</strong>
        </span>

        <Button className="bulk-actions-panel__btn" onPress={onClearSelection}>
          Отменить выбор
        </Button>

        {onDelete && (
          <Button className="bulk-actions-panel__btn" color="error" onPress={onDelete}>
            Удалить
          </Button>
        )}

        {onExport && (
          <Button className="bulk-actions-panel__btn" onPress={onExport}>
            Экспорт
          </Button>
        )}

        {onMoveNext && <Button onPress={onMoveNext}>В досудебку</Button>}
        {onMoveToCandidates && <Button onClick={onMoveToCandidates}>Вернуть в кандидаты</Button>}
      </Flex>
    )}
  </>
)
