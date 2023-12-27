import { roles, supervillainIdsToCheck, wolfIdsToCheck } from 'constant'
import { cards } from 'data'
import { CardType } from 'types'

const containsByName = (selectedCards: CardType[], cardName: string): boolean =>
  selectedCards.some((card) => card.display_name === cardName)

const containsById = (selectedCards: CardType[], cardId: number): boolean =>
  selectedCards.some((card) => card.id === cardId)

const containsByIds = (selectedCards: CardType[], ids: number[]): boolean =>
  selectedCards.some((card) => ids.includes(card.id))

const isMirrorManOrCopycatSelected = (selectedCards: CardType[]): boolean => {
  return (
    containsByName(selectedCards, roles.role_mirrorman) ||
    containsByName(selectedCards, roles.role_copycat)
  )
}

const prohibitDeselectingWerewolf = (
  selectedCards: CardType[],
  card: CardType
): boolean => {
  const numberOfSelectedWolfCards = selectedCards.filter((card) =>
    wolfIdsToCheck.includes(card.id)
  ).length

  const hasAlphaWolf = containsByName(selectedCards, roles.role_alphawolf)
  const isCardIdInWolfIds = wolfIdsToCheck.includes(card.id)

  return numberOfSelectedWolfCards === 1 && hasAlphaWolf && isCardIdInWolfIds
}

const prohibitDeselectingSupervillain = (
  selectedCards: CardType[],
  card: CardType
): boolean => {
  const numberOfSelectedVillainCards = selectedCards.filter((c) =>
    supervillainIdsToCheck.includes(c.id)
  ).length

  const hasTemptress = containsByName(selectedCards, roles.role_temptress)
  const isCardIdInVillainIds = supervillainIdsToCheck.includes(card.id)

  return (
    numberOfSelectedVillainCards === 1 && hasTemptress && isCardIdInVillainIds
  )
}

const selectCard = (selectedCards: CardType[], card: CardType): void => {
  selectedCards.push(card)
}

const deselectCard = (selectedCards: CardType[], card: CardType): void => {
  const index = selectedCards.findIndex(
    (selectedCard) => selectedCard.id === card.id
  )
  if (index !== -1) {
    selectedCards.splice(index, 1)
  }
}

const handleCard = (
  selectedCards: CardType[],
  idsToCheck: number[],
  defaultCardId: number
) => {
  if (!containsByIds(selectedCards, idsToCheck)) {
    const cardToAdd = cards.find((c) => c.id === defaultCardId) as CardType
    selectCard(selectedCards, cardToAdd)
  }
}

const handleAlphaWolf = (selectedCards: CardType[]): void => {
  handleCard(selectedCards, wolfIdsToCheck, 15)
}

const handleTemptress = (selectedCards: CardType[]): void => {
  handleCard(selectedCards, supervillainIdsToCheck, 60)
}

const determineTotalPlayers = (
  totalCharacters: number,
  selectedCards: CardType[]
): number => {
  const hasAlphaWolf = containsByName(selectedCards, roles.role_alphawolf)
  const hasTemptress = containsByName(selectedCards, roles.role_temptress)

  let totalPlayers
  if (hasAlphaWolf && hasTemptress) {
    totalPlayers = totalCharacters - 5
  } else if (hasAlphaWolf || hasTemptress) {
    totalPlayers = totalCharacters - 4
  } else {
    totalPlayers = totalCharacters - 3
  }

  return Math.max(totalPlayers, 0)
}

export const selectedDeckUtils = {
  containsById,
  deselectCard,
  determineTotalPlayers,
  handleAlphaWolf,
  handleTemptress,
  isMirrorManOrCopycatSelected,
  prohibitDeselectingSupervillain,
  prohibitDeselectingWerewolf,
  selectCard,
}
