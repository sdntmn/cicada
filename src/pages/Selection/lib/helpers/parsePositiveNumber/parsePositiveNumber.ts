export const parsePositiveNumber = (str: string): undefined | number => {
  const num = Number(str)
  return !isNaN(num) && num > 0 ? num : undefined
}
