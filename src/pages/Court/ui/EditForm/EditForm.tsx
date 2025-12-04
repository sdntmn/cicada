// AnalysisEditForm.tsx
import React from "react"
interface AnalysisEditFormProps {
  data: any
  itemId: string
  onNavigateToItem?: (target: { itemId: string; section: Menu; subSection: string }) => void
}

export const AnalysisEditForm: React.FC<AnalysisEditFormProps> = ({ data, itemId, onNavigateToItem }) => (
  <div className="edit-form">
    <h2>Редактирование анализа</h2>
  </div>
)
