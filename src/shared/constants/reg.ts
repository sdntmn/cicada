export const moneyReg = /^((\d+)|(\d+.\d{2}))$/
export const emailReg = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
export const phoneReg = /^[0-9]{10}$/
export const numberReg = /^\d{1,}$/
export const textReg = /[A-Za-zА-Яа-я]/i
export const containsNumberReg = /\d/i

export const numberSpaceReg = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g
export const searchPointReg = /[.]/g
export const searchCommaReg = /,/g
export const searchSpaceReg = /\s/g
export const numberAndPointReg = /^\d{0,}[.,]?\d{0,}$/
export const numberAndOnlyPointReg = /^\d{0,}\.{0,1}\d{0,}$/
export const fractionIndicationReg = /[,юб/]/gi
