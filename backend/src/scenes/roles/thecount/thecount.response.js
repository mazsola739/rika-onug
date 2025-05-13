import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, updateMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const thecountResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  updateMark(gamestate, token, [selected_mark_positions[0]], ['fear'])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_fear', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    uniqueInformation: { mark_of_fear: [selected_mark_positions[0]], selected_mark_positions },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
