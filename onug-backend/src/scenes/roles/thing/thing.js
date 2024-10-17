import { COPY_PLAYER_IDS, SCENE, MESSAGE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNeighborsByToken, getPlayerTokensByPlayerNumber, formatPlayerIdentifier } from '../../../utils'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

export const thing = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['thing_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 85 || (card.player_role_id === 85 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = thingInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })
  
  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const thingInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighbors = getPlayerNeighborsByToken(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'tap',
    selectableCards: { selectable_cards: neighbors, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const thingResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(newGamestate.players, [selected_card_positions[0]])
  //TODO only 1 player

  webSocketServerConnectionsPerRoom[newGamestate.room_id][tappedPlayerToken[0]].send(
    JSON.stringify({
      type: MESSAGE,
      message: ['message_tapped'],
      icon: 'tap',
    })
  )

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    tapped: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_tap', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'tap',
    uniqueInformations: { tap: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
