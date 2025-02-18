import { MESSAGE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../utils/connections.utils'
import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const thingResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])
  //TODO only 1 player

  webSocketServerConnectionsPerRoom[gamestate.room_id][tappedPlayerToken[0]].send(
    JSON.stringify({
      type: MESSAGE,
      message: ['message_tapped']
    })
  )

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    tapped: [selected_card_positions[0]]
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_tap', formatPlayerIdentifier(selected_card_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
