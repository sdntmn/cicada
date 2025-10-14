import React from "react"

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import { Layout } from "./index"

describe("Компонент Layout", () => {
  test("Рендерится с детьми (children)", () => {
    render(
      <Layout data-testid="layout-container">
        <div>Элемент 1</div>
        <div>Элемент 2</div>
      </Layout>
    )
    const layoutContainer = screen.getByTestId("layout-container")
    expect(layoutContainer).toBeInTheDocument()
    expect(layoutContainer).toHaveTextContent("Элемент 1")
    expect(layoutContainer).toHaveTextContent("Элемент 2")
  })

  test("Применяет дополнительный класс через props className", () => {
    render(
      <Layout className="custom-class" data-testid="layout-container">
        <div>Элемент 1</div>
      </Layout>
    )
    const layoutContainer = screen.getByTestId("layout-container")
    expect(layoutContainer).toHaveClass("itpc-layout")
    expect(layoutContainer).toHaveClass("custom-class")
  })

  test("Применяет дополнительные стили через props style", () => {
    render(
      <Layout data-testid="layout-container" style={{ backgroundColor: "red", padding: "16px" }}>
        <div>Элемент 1</div>
      </Layout>
    )
    const layoutContainer = screen.getByTestId("layout-container")
    expect(layoutContainer).toHaveStyle("background-color: red")
    expect(layoutContainer).toHaveStyle("padding: 16px")
  })
})
