export const thing = (gameState) => ["thing_kickoff_text"]

/* if (conditions.hasThingPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [85])
  return roles.thing_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

import { MESSAGE } from '../../constant/ws'
import { getPlayerTokensByPlayerNumber, getPlayerNeighborsByToken } from '../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
export const thing_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_must_one_neighbor"],
        'tap',
        { selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 },
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}

export const thing_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(newGameState.players, selected_positions[0])

  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken].send(JSON.stringify({
    type: MESSAGE,
    message: ["message_tapped"], icon: "tap",
  }))

  newGameState.players[token].player_history.tapped_player = selected_positions[0]

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_tap", selected_positions[0]],
      'tap',
      null,
      null,
      null,
      null,
      { tapped_player: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, scene_role_interactions }
}
