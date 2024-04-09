//@ts-check
import { logDebug, logError } from '../log'
import { readGameState, upsertRoomState } from '../repository'
import { alien_vote } from '../scenes/roles/aliens'
import { vampire_vote } from '../scenes/roles/vampires'
import { getAlienTokensByRoleIds, getVampireTokensByRoleIds } from '../utils'
import { websocketServerConnectionsPerRoom } from './connections'

export const roleVote = async (message) => {
  try {
    logDebug(`Role vote requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer } = message
    const gameState = await readGameState(room_id)

    const newGameState = generateRoleVoteResponse(gameState, token, selected_card_positions, selected_mark_positions)

    newGameState?.scene.forEach((item) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][item.token].send(JSON.stringify(item))
    })

    await upsertRoomState(newGameState)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

export const generateRoleVoteResponse = (gameState, token, selected_card_positions, selected_mark_positions) => {
  const interaction_type = gameState.players[token]?.player_history?.scene_title

  let newGameState = { ...gameState }

  switch (interaction_type) {
    case "ALIENS":
      const aliens = getAlienTokensByRoleIds(newGameState.players)
      newGameState = alien_vote(gameState, aliens, interaction_type, selected_card_positions)
      break
    case "VAMPIRES":
      const vampires = getVampireTokensByRoleIds(newGameState.players)
      newGameState = vampire_vote(gameState, vampires, interaction_type, selected_mark_positions)
      break
    default:

      break
  }

  return newGameState
}
