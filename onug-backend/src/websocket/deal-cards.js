//@ts-check
import { DEAL, REDIRECT } from '../constant'
import { logTrace } from '../log'
import { validateRoom } from '../validator'
import { upsertRoomState } from '../repository'
import { STAGES } from '../constant'
import { broadcast } from './connections'
import { determineTotalPlayers } from '../utils/player-utils'
import { createCenterPositionCard, createPlayerCard, createPlayerPositionCard, dealCardIds, hasMark } from '../utils/deal-cards-utils'

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
      center_left: createCenterPositionCard(leftCard),
      center_middle: createCenterPositionCard(middleCard),
      center_right: createCenterPositionCard(rightCard),
      center_wolf: createCenterPositionCard(newWolfCard),
      center_villain: createCenterPositionCard(newVillainCard),
      ...playerCards.reduce((positions, playerCard, index) => {
        positions[`player_${index + 1}`] = createPlayerPositionCard(playerCard, selectedCards)

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

  newGameState.selected_cards = Object.values(newGameState.card_positions).filter(value => value.card.id).map((value) => value.card.id)

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
    if (hasShield) { newGameState.players[token].shield = false }
  })

  await upsertRoomState(newGameState)

  const redirectToGameTable = {
    type: REDIRECT,
    path: `/gametable/${room_id}`,
  }

  return broadcast(room_id, redirectToGameTable)
}
