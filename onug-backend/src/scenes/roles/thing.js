//@ts-check
import { copyPlayerIds, SCENE, MESSAGE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNeighborsByToken, getPlayerTokensByPlayerNumber, formatPlayerIdentifier } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const thing = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['thing_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 85 || (card.player_role_id === 85 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = thing_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })
  
  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const thing_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'tap',
    selectableCards: { selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const thing_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(newGameState.players, selected_card_positions[0])
  //TODO only 1 player

  websocketServerConnectionsPerRoom[newGameState.room_id][tappedPlayerToken[0]].send(
    JSON.stringify({
      type: MESSAGE,
      message: ['message_tapped'],
      icon: 'tap',
    })
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    tapped: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_tap', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'tap',
    uniqueInformations: { tap: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
