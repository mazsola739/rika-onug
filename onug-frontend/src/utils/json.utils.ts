import { DECODE, ENCODE } from 'constant'

const processKeysRecursively = (input: any, mapping: Record<string, string>, logMessage: string): any => {
  if (Array.isArray(input)) {
    return input.map(item => processKeysRecursively(item, mapping, logMessage))
  } else if (input && typeof input === 'object') {
    const processedObject: Record<string, any> = {}
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

export const decodeJsonKeys = (input: any): any => {
  return processKeysRecursively(input, DECODE, 'No decoded key found for')
}

export const encodeJsonKeys = (input: any): any => {
  return processKeysRecursively(input, ENCODE, 'No encoded key found for')
}
