import { roles, supervillainIdsToCheck, wolfIdsToCheck } from 'constant'
import { cards } from 'data'
import { ActionCardType, CardType } from 'types'

const ALPHA_WOLF_DEFAULT_ID = 15
const TEMPTRESS_DEFAULT_ID = 60

const containsById = (selectedCards: CardType[], cardId: number): boolean =>
  selectedCards.some((card) => card.id === cardId)

const containsByIds = (selectedCards: CardType[], ids: number[]): boolean =>
  selectedCards.some((card) => ids.includes(card.id))

const containsByCriteria = (
  selectedCards: CardType[],
  criteria: ((card: CardType) => boolean) | number | string[]
): boolean => {
  if (typeof criteria === 'function') {
    return selectedCards.some(criteria)
  } else if (Array.isArray(criteria)) {
    return criteria.some((c) => containsByName(selectedCards, c))
  } else {
    return containsById(selectedCards, criteria as number)
  }
}

const containsByName = (selectedCards: CardType[], cardName: string): boolean =>
  selectedCards.some((card) => card.display_name === cardName)

const deselectCard = (selectedCards: CardType[], card: CardType): void => {
  const index = selectedCards.findIndex(
    (selectedCard) => selectedCard.id === card.id
  )
  if (index !== -1) {
    selectedCards.splice(index, 1)
  }
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

const handleAlphaWolf = (selectedCards: CardType[]): void => {
  handleCard(selectedCards, wolfIdsToCheck, ALPHA_WOLF_DEFAULT_ID)
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

const handleTemptress = (selectedCards: CardType[]): void => {
  handleCard(selectedCards, supervillainIdsToCheck, TEMPTRESS_DEFAULT_ID)
}

const hasSpecificRolesInDeck = (
  gamePlayDeck: ActionCardType[],
  rolesToCheck: string[]
): boolean => {
  return rolesToCheck.every((role) =>
    gamePlayDeck.some((card) => card.team === role)
  )
}

const isMirrorManOrCopycatSelected = (selectedCards: CardType[]): boolean => {
  return containsByCriteria(selectedCards, [
    roles.role_mirrorman,
    roles.role_copycat,
  ])
}

const prohibitDeselectingSupervillain = (
  selectedCards: CardType[],
  card: CardType
): boolean => {
  const numberOfSelectedVillainCards = selectedCards.filter((c) =>
    supervillainIdsToCheck.includes(c.id)
  ).length

  return (
    numberOfSelectedVillainCards === 1 &&
    containsByCriteria(selectedCards, [roles.role_temptress]) &&
    supervillainIdsToCheck.includes(card.id)
  )
}

const prohibitDeselectingWerewolf = (
  selectedCards: CardType[],
  card: CardType
): boolean => {
  const numberOfSelectedWolfCards = selectedCards.filter((card) =>
    wolfIdsToCheck.includes(card.id)
  ).length

  return (
    numberOfSelectedWolfCards === 1 &&
    containsByCriteria(selectedCards, [roles.role_alphawolf]) &&
    wolfIdsToCheck.includes(card.id)
  )
}

const selectCard = (selectedCards: CardType[], card: CardType): void => {
  selectedCards.push(card)
}

export const selectedDeckUtils = {
  containsById,
  deselectCard,
  determineTotalPlayers,
  handleAlphaWolf,
  handleTemptress,
  hasSpecificRolesInDeck,
  isMirrorManOrCopycatSelected,
  prohibitDeselectingSupervillain,
  prohibitDeselectingWerewolf,
  selectCard,
}
