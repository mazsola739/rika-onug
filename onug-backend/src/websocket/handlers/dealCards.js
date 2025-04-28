import { DEAL, STAGES, markPositions, REDIRECT } from '../../constants'
import { logTrace, logErrorWithStack } from '../../log'
import { upsertGamestate_, upsertRoomState } from '../../repository'
import { dealCardIds, determineTotalPlayers, createCenterPositionCard, createPlayerPositionCard, hasMark, createPlayerCard, broadcast } from '../../utils'
import { validateRoom, validateRoom_ } from '../../validators'

export const dealCards = async (ws, message) => {
  const { room_id } = message
  logTrace(`Dealing cards for players in room: ${room_id}`)

  try {

    const [gamestate] = await validateRoom(room_id)
    const [validity, config, errors] = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: DEAL, success: false, errors }))

    const selectedCards = [...config.selected_cards]

    const { playerCards, leftCard, middleCard, rightCard, newWolfCard, newVillainCard } = dealCardIds(selectedCards)

    const totalPlayers = determineTotalPlayers(selectedCards.length, selectedCards)

    const newConfig = {
      ...config,
      stage: STAGES.TABLE,
      total_players: totalPlayers,
    }

    const newGamestate = {
      ...gamestate,
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
      newGamestate.mark_positions = markPositions
      if (hasDoppelganger) {
        newGamestate.doppelganger_mark_positions = markPositions
      }
    }

    newConfig.selected_cards = [...selectedCards]

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
    await upsertGamestate_(room_id, "config", newConfig)

    const redirectToTable = { type: REDIRECT, path: `/table/${room_id}` }
    return broadcast(room_id, redirectToTable)
  } catch (error) {
    logErrorWithStack(error)
  }
}
