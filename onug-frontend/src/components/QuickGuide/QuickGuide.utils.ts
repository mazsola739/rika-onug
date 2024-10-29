import { CardType, TokenType } from "types"

export const getUniqueItems = <T>(items: T[], key: (item: T) => string): T[] => {
  const seenKeys = new Set<string>()

  return items.filter((item) => {
    const keyValue = key(item)

    if (seenKeys.has(keyValue)) {
      return false
    }

    seenKeys.add(keyValue)

    return true
  })
}

export const isCardType = (item: CardType | TokenType): item is CardType => {
    return (item as CardType).display_name !== undefined
}