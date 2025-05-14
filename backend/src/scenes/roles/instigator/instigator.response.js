import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, updateMark, updatePlayerKnownMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const instigatorResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  updateMark(gamestate, token, [selected_mark_positions[0]], ['traitor'])

  if (currentPlayerNumber === selected_mark_positions[0]) {
    updatePlayerKnownMark(gamestate, token, 'mark_of_traitor')
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_traitor', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
