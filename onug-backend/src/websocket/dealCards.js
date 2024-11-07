import { DEAL, REDIRECT, STAGES } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { createCenterPositionCard, createPlayerCard, createPlayerPositionCard, dealCardIds, hasMark } from '../utils/deal.utils'
import { determineTotalPlayers } from '../utils/player.utils'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const dealCards = async (ws, message) => {
  const { room_id } = message

  logTrace(`Dealing cards for players in room: ${room_id}`)

  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
  if (!roomIdValid) return ws.send(JSON.stringify({ type: DEAL, success: false, errors }))

  const selectedCards = [...gamestate.selected_cards]

  const { playerCards, leftCard, middleCard, rightCard, newWolfCard, newVillainCard } = dealCardIds(selectedCards)

  const totalPlayers = determineTotalPlayers(selectedCards.length, selectedCards)

  const newGamestate = {
    ...gamestate,
    stage: STAGES.TABLE,
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
      }, {})
    }
  }

  const clonedSelectedCards = [...selectedCards]
  const hasPlayerMark = hasMark(clonedSelectedCards)
  const hasDoppelganger = clonedSelectedCards.includes(1)

  if (hasPlayerMark) {
    newGamestate.mark_positions = {
      vampire: 'mark_of_vampire',
      fear: 'mark_of_fear',
      bat: 'mark_of_bat',
      disease: 'mark_of_disease',
      love_1: 'mark_of_love',
      love_2: 'mark_of_love',
      traitor: 'mark_of_traitor',
      clarity_1: 'mark_of_clarity',
      clarity_2: 'mark_of_clarity',
      assassin: 'mark_of_assassin'
    }
    if (hasDoppelganger) {
      newGamestate.doppelganger_mark_positions = {
        fear: 'mark_of_fear',
        bat: 'mark_of_bat',
        disease: 'mark_of_disease',
        love_1: 'mark_of_love',
        love_2: 'mark_of_love',
        traitor: 'mark_of_traitor',
        clarity_1: 'mark_of_clarity',
        clarity_2: 'mark_of_clarity',
        assassin: 'mark_of_assassin'
      }
    }
  }

  newGamestate.selected_cards = [...selectedCards]

  const playerTokens = Object.keys(gamestate.players)
  const hasShield = selectedCards.includes(25)

  playerTokens.forEach((token, index) => {
    newGamestate.players[token] = {
      ...gamestate.players[token],
      player_number: `player_${index + 1}`,
      card: createPlayerCard(playerCards[index], selectedCards),
      card_or_mark_action: false,
      action_finished: true,
      player_history: {}
    }
    if (hasShield) {
      newGamestate.players[token].shield = false
    }
  })

  await upsertRoomState(newGamestate)

  const redirectToTable = { type: REDIRECT, path: `/table/${room_id}` }
  return broadcast(room_id, redirectToTable)
}
