import React from "react"

import { Meta, StoryObj } from "@storybook/react"

import { Button, Layout } from "../../index"

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: "Layout/Layout",
}

export default meta

type Story = StoryObj<typeof Layout>

const Template: React.FC = (args) => (
  <Layout {...args}>
    <Button>Button</Button>
  </Layout>
)

export const Basic: Story = {
  args: {},
  name: "Базовый",
  render: (args) => <Template {...args} />,
}
