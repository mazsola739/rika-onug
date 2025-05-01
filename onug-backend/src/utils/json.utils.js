import { DECODE, ENCODE } from '../constants'

const processKeysRecursively = (input, mapping, logMessage) => {
  console.log("input", input)
  if (Array.isArray(input)) {
    return input.map(item => processKeysRecursively(item, mapping, logMessage))
  } else if (input && typeof input === 'object') {
    const processedObject = {}
    for (const [key, value] of Object.entries(input)) {
      const mappedKey = mapping[key]
      if (!mappedKey) {
        console.log(`${logMessage}: ${key}`)
      }
      processedObject[mappedKey || key] = processKeysRecursively(value, mapping, logMessage)
    }
    return processedObject
  }
  return input
}

export const decodeJsonKeys = input => {
  return processKeysRecursively(input, DECODE, 'No decoded key found for')
}

export const encodeJsonKeys = input => {
  return processKeysRecursively(input, ENCODE, 'No encoded key found for')
}
