const findById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

const pickRandomKey = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[Math.floor(Math.random() * keys.length)] as keyof T
}

export const utils = { findById, pickRandomKey }
