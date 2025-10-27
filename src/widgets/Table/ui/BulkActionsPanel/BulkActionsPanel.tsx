// src/pages/Selection/ui/BulkActionsPanel/BulkActionsPanel.tsx

import React from "react"

import { Button } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

export interface BulkActionsPanelProps {
  onClearSelection: () => void
  onDelete?: () => void
  onExport?: () => void
  selectedCount: number
  // Добавьте другие действия по мере необходимости
}

export const BulkActionsPanel: React.FC<BulkActionsPanelProps> = ({ onClearSelection, onDelete, onExport, selectedCount }) => (
  <div className="bulk-actions-panel">
    <Flex align="center" gap={16}>
      <span className="bulk-actions-panel__text">
        Выбрано: <strong>{selectedCount}</strong>
      </span>

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

      <Button className="bulk-actions-panel__btn" onPress={onClearSelection}>
        Отменить выбор
      </Button>
      <Button className="bulk-actions-panel__btn" onPress={onClearSelection}>
        Какие то действия
      </Button>
    </Flex>
  </div>
)
