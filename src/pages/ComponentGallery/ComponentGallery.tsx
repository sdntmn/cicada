// src/pages/ComponentGallery.jsx
import React from "react"

import { Button } from "@/shared/ui/Button"
import { Card } from "@/shared/ui/Card"
import { Label } from "@/shared/ui/Label"

export const ComponentGallery = () => (
  <div className="component-gallery">
    {/* Секция для кнопок */}
    <section className="gallery-section" data-section="buttons">
      <h2>Buttons</h2>
      <div className="component-grid">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </section>

    {/* Секция для Label */}
    <section className="gallery-section" data-section="labels">
      <h2>Labels</h2>
      <div className="component-grid">
        <Card interactive>
          <Label>Default Label</Label>
        </Card>
        <Card variant="elevated" interactive>
          <Label size="sm">Small Label</Label>
        </Card>
        <Card variant="outlined" interactive>
          <Label size="lg">Large Label</Label>
        </Card>
        <Card variant="elevated" interactive>
          <Label variant="primary">Primary Label</Label>
        </Card>

        <Label variant="secondary">Secondary Label</Label>
        <Label variant="success">Success Label</Label>
        <Label variant="warning">Warning Label</Label>
        <Label variant="danger">Danger Label</Label>
        <Label variant="info">Info Label</Label>
        <Label required>Required Label</Label>
        <Label disabled>Disabled Label</Label>
        <Label disabled required>
          Required Disabled
        </Label>
      </div>
    </section>
  </div>
)

export default ComponentGallery
