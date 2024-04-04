//@ts-check
import { logDebug, logError } from '../log'
import { readGameState, upsertRoomState } from '../repository'
import { websocketServerConnectionsPerRoom } from './connections'

export const vote = async (message) => {
  try {
    logDebug(`Vote requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer } = message
    const gameState = await readGameState(room_id)
    // TODO validate client request

    const newGameState = generateVoteResponse(gameState, token, selected_card_positions, selected_mark_positions, selected_answer, ws)

    newGameState?.scene.forEach((item) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][item.token].send(JSON.stringify(item))
    })

    await upsertRoomState(newGameState)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

export const generateVoteResponse = (gameState, token, selected_card_positions, selected_mark_positions, selected_answer, ws) => {
  const interaction_type = gameState.players[token]?.player_history?.scene_title

  let newGameState = { ...gameState }

  switch (interaction_type) {
    case "VAMPIRES":
      newGameState = vampire_vote(gameState, token, interaction_type)
      break
    default:

      break
  }

  return newGameState
}
