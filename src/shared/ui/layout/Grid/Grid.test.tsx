import React from "react"

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import { Col, Row, RowAlign, RowJustify } from "./index"

describe("Компонент Row", () => {
  test("Рендерится с детьми (children)", () => {
    render(
      <Row data-testid="row-container">
        <div>Элемент 1</div>
        <div>Элемент 2</div>
      </Row>
    )

    const rowContainer = screen.getByTestId("row-container")
    expect(rowContainer).toBeInTheDocument()
    expect(rowContainer).toHaveTextContent("Элемент 1")
    expect(rowContainer).toHaveTextContent("Элемент 2")
  })

  test("Применяет классы, сгенерированные generateRowClassList", () => {
    render(
      <Row align={RowAlign.TOP} data-testid="row-container" justify={RowJustify.CENTER} wrap={false}>
        <div>Элемент 1</div>
      </Row>
    )

    const rowContainer = screen.getByTestId("row-container")
    expect(rowContainer).toHaveClass("itpc-row-no_wrap")
    expect(rowContainer).toHaveClass("itpc-row-align_top")
    expect(rowContainer).toHaveClass("itpc-row-justify_center")
  })

  test("Применяет стили, сгенерированные generateRowStyle", () => {
    render(
      <Row data-testid="row-container" gap={16}>
        <div>Элемент 1</div>
      </Row>
    )

    const rowContainer = screen.getByTestId("row-container")
    expect(rowContainer).toHaveStyle("rowGap: 16px")
    expect(rowContainer).toHaveStyle("marginLeft: -8px")
    expect(rowContainer).toHaveStyle("marginRight: -8px")
  })
})

describe("Компонент Col", () => {
  test("Рендерится с детьми (children)", () => {
    render(
      <Row data-testid="row-container">
        <Col data-testid="col-container">Элемент 1</Col>
      </Row>
    )

    const colContainer = screen.getByTestId("col-container")
    expect(colContainer).toBeInTheDocument()
    expect(colContainer).toHaveTextContent("Элемент 1")
  })

  test("Применяет классы, сгенерированные generateColClassList", () => {
    render(
      <Row data-testid="row-container">
        <Col col={3} data-testid="col-container">
          Элемент 1
        </Col>
      </Row>
    )

    const colContainer = screen.getByTestId("col-container")
    expect(colContainer).toHaveClass("itpc-col-3")
  })

  test("Применяет стили, сгенерированные generateColStyle", () => {
    render(
      <Row data-testid="row-container" gap={16}>
        <Col data-testid="col-container">Элемент 1</Col>
      </Row>
    )

    const colContainer = screen.getByTestId("col-container")
    expect(colContainer).toHaveStyle("paddingLeft: 8px")
    expect(colContainer).toHaveStyle("paddingRight: 8px")
  })
})
