import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, updateMark, updatePlayerKnownMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const cupidResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  updateMark(gamestate, token, [selected_mark_positions[0], selected_mark_positions[1]], ['love_1, love_2'])

  if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
    updatePlayerKnownMark(gamestate, token, 'mark_of_love')
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_love', ...messageIdentifiers, 'POINT'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
