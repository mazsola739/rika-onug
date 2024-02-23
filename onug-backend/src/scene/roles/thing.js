//@ts-check
import { MESSAGE, SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getPlayerNeighborsByToken,
  getPlayerTokensByPlayerNumber,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'
import { websocketServerConnectionsPerRoom } from './../../websocket/connections'

export const thing = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['thing_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 85) {
      interaction = thing_interaction(newGameState, token)
    }

          newGameState.players[token].player_history.scene_title = title
scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const thing_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: neighbors,
    selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'tap',
    selectableCards: {
      selectable_cards: neighbors,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}

export const thing_response = (gameState, token, selected_positions, title) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(
    newGameState.players,
    selected_positions[0]
  ) //TODO only 1 player

  websocketServerConnectionsPerRoom[newGameState.room_id][
    tappedPlayerToken[0]
  ].send(
    JSON.stringify({
      type: MESSAGE,
      message: ['message_tapped'],
      icon: 'tap',
    })
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    tapped_player: [selected_positions[0]],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_tap', selected_positions[0]],
    icon: 'tap',
    uniqInformations: { tapped_player: [selected_positions[0]] },
  })
}
