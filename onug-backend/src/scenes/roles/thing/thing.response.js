import { MESSAGE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { getPlayerTokensByPlayerNumber, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

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
    })
  )

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    tapped: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_tap', formatPlayerIdentifier(selected_card_positions)[0]],
  })

  scene.push({ [token]: { interaction } })
  newGamestate.scene[title] = scene

  return newGamestate
}
