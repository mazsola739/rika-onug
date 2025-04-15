import { HAS_MARK, SUPER_VILLAIN_TO_CHECK, WEREVOLVES_TO_CHECK } from '../constants'
import cards from '../data/cards.json'
import { logInfo } from '../log'
import { getCenterCardPositionByIndex, stubbedCards } from '../omnipotent/stub/populateDeal'
import { hasCurator } from '../scenes'

const hasAlphaWolf = selectedCardIds => selectedCardIds.includes(17)
const hasTemptress = selectedCardIds => selectedCardIds.includes(69)
export const hasMark = selectedCardIds => HAS_MARK.some(id => selectedCardIds.includes(id))

const getCardById = card_id => cards.find(card => card.id === card_id)
const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min
const getRandomItemFromArray = array => array[getRandomNumber(0, array.length - 1)]
const filterCardsByIds = (selectedCardIds, idsToCheck) => selectedCardIds.filter(cardId => idsToCheck.includes(cardId))

const shuffle = selectedCardIds => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j], selectedCardIds[i]]
  }

  return selectedCardIds
}
const getStubbedOrDealtCard = (stubbedCard, dealtCard) => stubbedCard || dealtCard

export const dealCardIds = selectedCardIds => {
  let cardIds = [...selectedCardIds]

  let newWolfCardId = hasAlphaWolf(selectedCardIds) ? getRandomItemFromArray(filterCardsByIds(cardIds, WEREVOLVES_TO_CHECK)) : undefined
  newWolfCardId = getStubbedOrDealtCard(stubbedCards.newWolfCard, newWolfCardId)
  let newVillainCardId = hasTemptress(selectedCardIds) ? getRandomItemFromArray(filterCardsByIds(cardIds, SUPER_VILLAIN_TO_CHECK)) : undefined
  newVillainCardId = getStubbedOrDealtCard(stubbedCards.newVillainCard, newVillainCardId)

  if (newWolfCardId) cardIds = cardIds.filter(cardId => cardId !== newWolfCardId)
  if (newVillainCardId) cardIds = cardIds.filter(cardId => cardId !== newVillainCardId)

  const shuffledCards = shuffle(cardIds)

  const centerCardIds = shuffledCards.slice(0, 3)
  const playerCardIds = shuffledCards.slice(3)

  playerCardIds.forEach((playerCardId, index) => (playerCardIds[index] = getStubbedOrDealtCard(stubbedCards.playerCards[index], playerCardId)))
  centerCardIds.forEach((centerCardId, index) => (centerCardIds[index] = getStubbedOrDealtCard(stubbedCards[getCenterCardPositionByIndex(index)], centerCardId)))

  const playerCards = playerCardIds.map(id => getCardById(id))
  const centerCards = centerCardIds.map(id => getCardById(id))

  logInfo('dealt playerCards: ', playerCards)
  logInfo('dealt centerCards: ', centerCards)
  logInfo('stubbedCards: ', stubbedCards)
  const leftCard = centerCards[0]
  const middleCard = centerCards[1]
  const rightCard = centerCards[2]
  const newWolfCard = getCardById(newWolfCardId)
  const newVillainCard = getCardById(newVillainCardId)

  return {
    playerCards,
    leftCard,
    middleCard,
    rightCard,
    newWolfCard,
    newVillainCard
  }
}

export const createPlayerCard = (card, selected_cards) => {
  if (!card || typeof card !== 'object' || !card.id)
    return {
      player_original_id: 0,
      player_card_id: 0,
      player_role: '',
      player_role_id: 0,
      player_team: ''
    }

  const playerCard = {
    player_original_id: card.id,
    player_card_id: card.id,
    player_role: card.role,
    player_role_id: card.id,
    player_team: card.team
  }

  const hasPlayerMark = hasMark(selected_cards)
  const hasPlayerArtifact = hasCurator(selected_cards)

  if (hasPlayerArtifact) {
    playerCard.player_artifact = 0
  }
  if (hasPlayerMark) {
    playerCard.player_mark = 'mark_of_clarity'
  }

  return playerCard
}

export const createPlayerPositionCard = (card, selected_cards) => {
  if (!card || typeof card !== 'object' || !card.id) {
    return { card: { id: 0, role: '', team: '' } }
  }

  const hasPlayerMark = hasMark(selected_cards)
  const hasPlayerArtifact = hasCurator(selected_cards)

  const positionCard = {
    card: {
      id: card.id,
      role: card.role,
      team: card.team
    }
  }

  if (hasPlayerArtifact) {
    positionCard.artifact = 0
  }
  if (hasPlayerMark) {
    positionCard.mark = 'mark_of_clarity'
  }

  return positionCard
}

export const createCenterPositionCard = card => {
  if (!card || typeof card !== 'object' || !card.id) return { card: { id: 0, role: '', team: '' } }

  let positionCard

  positionCard = {
    card: {
      id: card.id,
      role: card.role,
      team: card.team
    }
  }

  return positionCard
}
