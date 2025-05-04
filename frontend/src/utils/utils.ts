import { ADJECTIVES, NOUNS } from 'constants'
import { CardJson, PresetType, RoomType, TablePlayerCard } from 'types'

export const areAnyCardSelectedById = (selectedCards: CardJson[], cardIds: number[]): boolean => cardIds.some(cardId => isCardSelectedById(selectedCards, cardId))

export const isCardSelectedById = (selectedCards: CardJson[], cardId: number): boolean => selectedCards.some(card => card.id === cardId)

export const checkCardPresence = (cards: CardJson[], cardId: number): boolean => cards.some(card => card.id === cardId)

export const splitCardsToTable = (tablePlayerCards: TablePlayerCard[], tablePlayerCard: TablePlayerCard) => {
  const playerNumber = Number(`${tablePlayerCard.position}`.replace('player_', ''))
  const playerIndex = playerNumber - 1

  const newTablePlayerCards = [...tablePlayerCards.slice(playerIndex), ...tablePlayerCards.slice(0, playerIndex)]

  const remainingTablePlayerCards = newTablePlayerCards.slice(1)

  if (remainingTablePlayerCards.length === 2) {
    const [rightCard, leftCard] = remainingTablePlayerCards
    return {
      right: [rightCard],
      middle: [],
      left: [leftCard],
      ownCard: newTablePlayerCards[0]
    }
  }

  const third = Math.floor(remainingTablePlayerCards.length / 3)
  const right = remainingTablePlayerCards.slice(0, third).reverse()
  const left = remainingTablePlayerCards.slice(-third)
  const middle = remainingTablePlayerCards.slice(third, -third).reverse()

  return { right, middle, left, ownCard: newTablePlayerCards[0] }
}

export const generateFunnyNickname = () => {
  const randomAdjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  return `${randomAdjective}${randomNoun}`
}


export const lobbyData = (rooms: RoomType[], presets: PresetType[]) => {
  const newRooms = rooms.map(room => ({
    option: room.room_name,
    value: room.room_id
  }))

  const newPresets = presets.map(preset => ({
    option: preset.description,
    value: preset.description
  }))

  return { newRooms, newPresets }
}