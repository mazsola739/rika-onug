import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, updateMark, updatePlayerKnownMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const priestResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  updateMark(gamestate, token, [currentPlayerNumber, selected_mark_positions[0]], ['clarity_1, clarity_2'])
  updatePlayerKnownMark(gamestate, token, 'mark_of_clarity')

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_clarity', ...formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
