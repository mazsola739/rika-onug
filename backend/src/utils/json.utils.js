import { DECODE, ENCODE } from '../constants'

export const encodeJsonKeys = data => {
  try {
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item !== null && typeof item === 'object') {
          return encodeJsonKeys(item)
        }
        return item
      })
    } else if (data !== null && typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          const encodedKey = ENCODE[key]
          if (!encodedKey) {
            console.warn(`No encoded key found for: ${key}, using original key.`)
            return [key, encodeJsonKeys(value)]
          }
          const newValue = encodeJsonKeys(value)
          return [encodedKey, newValue]
        })
      )
    }
    return data
  } catch (error) {
    console.error('Error encoding JSON keys:', error)
    return null
  }
}

export const decodeJsonKeys = data => {
  try {
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item !== null && typeof item === 'object') {
          return decodeJsonKeys(item)
        }
        return item
      })
    } else if (data !== null && typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          const decodedKey = DECODE[key]
          if (!decodedKey) {
            console.warn(`No decoded key found for: ${key}, using original key.`)
            return [key, decodeJsonKeys(value)]
          }
          const newValue = decodeJsonKeys(value)
          return [decodedKey, newValue]
        })
      )
    }
    return data
  } catch (error) {
    console.error('Error decoding JSON keys:', error)
    return null
  }
}
