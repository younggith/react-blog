export const replaceDateOfString = (value: string) => {
  if (isEmptyOrNull(value)) {
    return ''
  }

  return value.replace(/\-/g, '').replace(/\:/g, '')
}

export const isEmptyOrNull = (value: any) => {
  if (
    value === null ||
    value === undefined ||
    value === 'undefined' ||
    value === '' ||
    value.toString().replace(/ /gi, '') === ''
  ) {
    return true
  }
  return false
}
