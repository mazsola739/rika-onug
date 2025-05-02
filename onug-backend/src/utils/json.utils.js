import { DECODE, ENCODE } from '../constants'

export const encodeJsonKeys = (data) => {
  try {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        const encodedKey = ENCODE[key]
        if (!encodedKey) {
          console.warn(`No encoded key found for: ${key}, using original key.`)
          return [key, value]
        }
        return [encodedKey, value]
      })
    )
  } catch (error) {
    console.error('Error encoding JSON keys:', error)
    return null
  }
}

export const decodeJsonKeys = (data) => {
  try {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        const decodedKey = DECODE[key]
        if (!decodedKey) {
          console.warn(`No decoded key found for: ${key}, using original key.`)
          return [key, value]
        }
        return [decodedKey, value]
      })
    )
  } catch (error) {
    console.error('Error decoding JSON keys:', error)
    return null
  }
}

