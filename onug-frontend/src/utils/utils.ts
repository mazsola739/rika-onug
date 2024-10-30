import { CardJson, TablePlayerCard } from 'types'

export const areAnyCardSelectedById = (
  selectedCards: CardJson[],
  cardIds: number[]
): boolean =>
  cardIds.some((cardId) => isCardSelectedById(selectedCards, cardId))

export const findCardById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

export const isCardSelectedById = (
  selectedCards: CardJson[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

export const checkCardPresence = (cards: CardJson[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

export const capitalize = (string: string) =>
  string && string[0].toUpperCase() + string.slice(1).toLowerCase()

export const splitPlayersToTable = (players: TablePlayerCard[], player: TablePlayerCard) => {
  const playerNumber = Number(`${player.position}`.replace("player_", ""))
  const playerIndex = playerNumber - 1

  const newPlayers = [...players.slice(playerIndex), ...players.slice(0, playerIndex)]

  const remainingPlayers = newPlayers.slice(1)

  const third = Math.floor(remainingPlayers.length / 3)

  const right = remainingPlayers.slice(0, third).reverse()
  const left = remainingPlayers.slice(-third)
  const middle = remainingPlayers.slice(third, -third).reverse()

  return { right, middle, left }
}
