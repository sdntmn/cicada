import { RowAlign, RowJustify } from "../../../enums"

import { generateColClassList, generateColStyle, generateRowClassList, generateRowStyle } from "./utils"

describe("Утилита generateColClassList", () => {
  test("Генерирует базовый класс itpc-col", () => {
    const classList = generateColClassList({})
    expect(classList).toBe("itpc-col")
  })

  test("Добавляет класс itpc-col-<col>, если передан col", () => {
    const classList = generateColClassList({ col: 3 })
    expect(classList).toContain("itpc-col-3")
  })

  test("Не добавляет itpc-col-<col>, если передан flex", () => {
    const classList = generateColClassList({ col: 3, flex: 1 })
    expect(classList).not.toContain("itpc-col-3")
  })

  test("Добавляет переданный className", () => {
    const classList = generateColClassList({ className: "custom-class" })
    expect(classList).toContain("custom-class")
  })
})

describe("Утилита generateColStyle", () => {
  test("Добавляет paddingLeft и paddingRight, если передан gap", () => {
    const style = generateColStyle({}, 16)
    expect(style).toEqual({
      paddingLeft: "8px",
      paddingRight: "8px",
    })
  })

  test("Добавляет order, если передан order", () => {
    const style = generateColStyle({ order: 2 })
    expect(style).toEqual({ order: 2 })
  })

  test("Добавляет flex, если передан flex", () => {
    const style = generateColStyle({ flex: 1 })
    expect(style).toEqual({ flex: "1 1 auto" })
  })

  test("Добавляет переданные стили", () => {
    const style = generateColStyle({ style: { backgroundColor: "red" } })
    expect(style).toEqual({ backgroundColor: "red" })
  })
})

describe("Утилита generateRowClassList", () => {
  test("Генерирует базовый класс itpc-row", () => {
    const classList = generateRowClassList({})
    expect(classList).toBe("itpc-row itpc-row-no_wrap")
  })

  test("Добавляет класс itpc-row-no_wrap, если wrap=false", () => {
    const classList = generateRowClassList({ wrap: false })
    expect(classList).toContain("itpc-row-no_wrap")
  })

  test("Добавляет класс itpc-row-align_<align>, если передан align", () => {
    const classList = generateRowClassList({ align: RowAlign.TOP })
    expect(classList).toContain("itpc-row-align_top")
  })

  test("Добавляет класс itpc-row-justify_<justify>, если передан justify", () => {
    const classList = generateRowClassList({ justify: RowJustify.CENTER })
    expect(classList).toContain("itpc-row-justify_center")
  })

  test("Добавляет переданный className", () => {
    const classList = generateRowClassList({ className: "custom-class" })
    expect(classList).toContain("custom-class")
  })
})

describe("Утилита generateRowStyle", () => {
  test("Добавляет rowGap, marginLeft и marginRight, если передан gap", () => {
    const style = generateRowStyle({ gap: 16 })
    expect(style).toEqual({
      marginLeft: "-8px",
      marginRight: "-8px",
      rowGap: "16px",
    })
  })

  test("Добавляет переданные стили", () => {
    const style = generateRowStyle({ style: { backgroundColor: "red" } })
    expect(style).toEqual({ backgroundColor: "red" })
  })
})
