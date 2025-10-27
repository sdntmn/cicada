declare const __IS_DEV__: boolean
declare const __API__: string

declare module "*.svg" {
  const content: string
  export default content
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
