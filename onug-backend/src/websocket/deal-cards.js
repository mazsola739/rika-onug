//@ts-check
import { DEAL, REDIRECT } from '../constant/ws'
import { logTrace, logInfo } from '../log'
import { validateRoom } from '../validator'
import { upsertRoomState } from '../repository'
import { STAGES } from '../constant/stage'
import { broadcast } from './connections'
import { stubbedCards, getCenterCardPositionByIndex } from '../stub/populate-deal'
import cards from '../data/cards.json'
import { determineTotalPlayers } from '../utils/player'

const alphaWolfId = 17
const temptressId = 69

const wolfIdsToCheck = [15, 16, 21, 22]
const supervillainIdsToCheck = [57, 60, 65]

const markIds = [28, 29, 31, 32, 34, 38, 39, 40, 41]

const hasAlphaWolf = (selectedCardIds) => selectedCardIds.includes(alphaWolfId)
const hasTemptress = (selectedCardIds) => selectedCardIds.includes(temptressId)
const hasMark = (selectedCardIds) =>  markIds.some((id) => selectedCardIds.includes(id))

const getCardById = (card_id) => cards.find((card) => card.id === card_id)
const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min
const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]
const filterCardsByIds = (selectedCardIds, idsToCheck) => selectedCardIds.filter((cardId) => idsToCheck.includes(cardId))

const shuffle = (selectedCardIds) => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j], selectedCardIds[i]]
  }

  return selectedCardIds
}
const getStubbedOrDealtCard = (stubbedCard, dealtCard) => stubbedCard || dealtCard

export const dealCardIds = (selectedCardIds) => {
  let cardIds = [...selectedCardIds]

  let newWolfCardId = hasAlphaWolf(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, wolfIdsToCheck))
    : undefined
  newWolfCardId = getStubbedOrDealtCard(stubbedCards.newWolfCard, newWolfCardId)
  let newVillainCardId = hasTemptress(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, supervillainIdsToCheck))
    : undefined
  newVillainCardId = getStubbedOrDealtCard(stubbedCards.newVillainCard, newVillainCardId)

  if (newWolfCardId) cardIds    = cardIds.filter((cardId) => cardId !== newWolfCardId)
  if (newVillainCardId) cardIds = cardIds.filter((cardId) => cardId !== newVillainCardId)

  const shuffledCards = shuffle(cardIds)

  const centerCardIds = shuffledCards.slice(0, 3)
  const playerCardIds = shuffledCards.slice(3)

  playerCardIds.forEach((playerCardId, index) => playerCardIds[index] = getStubbedOrDealtCard(stubbedCards.playerCards[index], playerCardId))
  centerCardIds.forEach((centerCardId, index) => centerCardIds[index] = getStubbedOrDealtCard(stubbedCards[getCenterCardPositionByIndex(index)], centerCardId))
  

  const playerCards = playerCardIds.map((id) => getCardById(id))
  const centerCards = centerCardIds.map((id) => getCardById(id))

  logInfo('dealt playerCards: ', playerCards,)
  logInfo('dealt centerCards: ', centerCards)
  logInfo('stubbedCards: ', stubbedCards)
  const leftCard       = centerCards[0]
  const middleCard     = centerCards[1]
  const rightCard      = centerCards[2]
  const newWolfCard    = getCardById(newWolfCardId)
  const newVillainCard = getCardById(newVillainCardId)


  return {
    playerCards,
    leftCard,
    middleCard,
    rightCard,
    newWolfCard,
    newVillainCard,
  }
}

const createPlayerCard = (card, selected_cards) => {
  if (!card || typeof card !== "object" || !card.id) return { player_original_id: 0, player_card_id: 0, player_role: "", player_role_id: 0, team: ""}

  let playerCard

  const hasPlayerMark = hasMark(selected_cards)

  if (hasPlayerMark) {
    playerCard = {
      player_original_id: card.id,
      player_card_id: card.id,
      player_role: card.role,
      player_role_id: card.id,
      player_team: card.team,
      player_mark: "mark_of_clarity",
    }
  } else {
    playerCard = {
      player_original_id: card.id,
      player_card_id: card.id,
      player_role: card.role,
      player_role_id: card.id,
      player_team: card.team,
    }
  }

  return playerCard
}

const createPositionCard = (card, selected_cards) => {
  if (!card || typeof card !== "object" || !card.id) return { id: 0, role: "", team: ""}

  let positionCard
  
  const hasPlayerMark = hasMark(selected_cards)

  if (hasPlayerMark) {
    positionCard = {
      id: card.id,
      role: card.role,
      team: card.team,
      mark: "mark_of_clarity",
    }
  } else {
    positionCard = {
      id: card.id,
      role: card.role,
      team: card.team,
    }
  }

  return positionCard
}

export const dealCards = async (ws, message) => {
  const { room_id } = message

  logTrace(`Dealing cards for players in room: ${room_id}`)

  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return ws.send(JSON.stringify({ type: DEAL, success: false, errors }))

  const selectedCards = gameState.selected_cards
  const {
    playerCards,
    leftCard,
    middleCard,
    rightCard,
    newWolfCard,
    newVillainCard,
  } = dealCardIds(selectedCards)

  const totalPlayers = determineTotalPlayers(gameState.selected_cards.length, gameState.selected_cards)

  const newGameState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    total_players: totalPlayers,
    card_positions: {
      center_left: createPositionCard(leftCard, selectedCards),
      center_middle: createPositionCard(middleCard, selectedCards),
      center_right: createPositionCard(rightCard, selectedCards),
      center_wolf: createPositionCard(newWolfCard, selectedCards),
      center_villain: createPositionCard(newVillainCard, selectedCards),
      ...playerCards.reduce((positions, playerCard, index) => {
        positions[`player_${index + 1}`] = createPositionCard(playerCard, selectedCards)
        
        return positions
      }, {}),
    },
  }

  const hasPlayerMark = hasMark(selectedCards)
  const hasDoppelganger = selectedCards.includes(1)

  if (hasPlayerMark) {
    newGameState.mark_positions = {
      vampire: "mark_of_vampire",
      fear: "mark_of_fear",
      bat: "mark_of_bat",
      disease: "mark_of_disease",
      love_1: "mark_of_love",
      love_2: "mark_of_love",
      traitor: "mark_of_traitor",
      clarity_1: "mark_of_clarity",
      clarity_2: "mark_of_clarity",
      assassin: "mark_of_assassin",
    }
    if (hasDoppelganger) {
      newGameState.doppelganger_mark_positions = {
        fear: "mark_of_fear",
        bat: "mark_of_bat",
        disease: "mark_of_disease",
        love_1: "mark_of_love",
        love_2: "mark_of_love",
        traitor: "mark_of_traitor",
        clarity_1: "mark_of_clarity",
        clarity_2: "mark_of_clarity",
        assassin: "mark_of_assassin",
      }
    }
  }

  newGameState.selected_cards = Object.values(newGameState.card_positions).filter(value => value.id).map((value) => value.id)

  const playerTokens = Object.keys(gameState.players)
  const hasShield = selectedCards.includes(25)

  playerTokens.forEach((token, index) => {
    newGameState.players[token] = {
      ...gameState.players[token],
      player_number: index + 1,
      card: createPlayerCard(playerCards[index], selectedCards),
      card_or_mark_action: false,
      player_history: {},
    }
    if (hasShield) {newGameState.players[token].shield = false}
  })

  await upsertRoomState(newGameState)

  const redirectToGameTable = {
    type: REDIRECT,
    path: `/gametable/${room_id}`,
  }

  return broadcast(room_id, redirectToGameTable)
}
