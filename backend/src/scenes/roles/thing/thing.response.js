import { MESSAGE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../utils'
import { getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const thingResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const tappedPlayerToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  //TODO FIX IT
  webSocketServerConnectionsPerRoom[gamestate.room_id][tappedPlayerToken[0]].send(
    JSON.stringify({
      type: MESSAGE,
      message: ['message_tapped']
    })
  )

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_tap', ...formatPlayerIdentifier([selected_card_positions[0]])],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
