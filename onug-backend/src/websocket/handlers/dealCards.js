import { DEAL, STAGES, markPositions, REDIRECT } from '../../constants'
import { logTrace, logErrorWithStack } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { dealCardIds, createCenterPositionCard, createPlayerPositionCard, hasMark, createPlayerCard, broadcast } from '../../utils'
import { validateRoom_ } from '../../validators'

export const dealCards = async (ws, message) => {
  const { room_id } = message
  logTrace(`Dealing cards for players in room: ${room_id}`)

  try {
    const { validity, roomState, players, table, errors } = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: DEAL, success: false, errors }))

    const selectedCards = [...roomState.selected_cards]

    const { playerCards, leftCard, middleCard, rightCard, newWolfCard, newVillainCard } = dealCardIds(selectedCards)

    const newState = {
      ...roomState,
      stage: STAGES.TABLE,
    }

    const newTable = {
      ...table,
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
      newTable.mark_positions = markPositions
      if (hasDoppelganger) {
        newTable.doppelganger_mark_positions = markPositions
      }
    }

    newState.selected_cards = [...selectedCards]

    const playerTokens = Object.keys(players.players)
    const hasShield = selectedCards.includes(25)

    const newPlayers = {
      ...players,
    }

    playerTokens.forEach((token, index) => {
      newPlayers.players[token] = {
        ...players.players[token],
        player_number: `player_${index + 1}`,
        card: createPlayerCard(playerCards[index], selectedCards),
        card_or_mark_action: false,
        action_finished: true,
        player_history: {}
      }
      if (hasShield) {
        newPlayers.players[token].shield = false
      }
    })

    await upsertRoomState_(room_id, "roomState", newState)
    await upsertRoomState_(room_id, "players", newPlayers)
    await upsertRoomState_(room_id, "table", newTable)

    const redirectToTable = { type: REDIRECT, path: `/table/${room_id}` }
    return broadcast(room_id, redirectToTable)
  } catch (error) {
    logErrorWithStack(error)
  }
}
