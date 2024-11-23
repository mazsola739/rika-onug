export const createNumberArray = number => {
  const result = []
  for (let i = 1; i <= number; i++) {
    result.push(`${i}`)
  }
  return result
}
