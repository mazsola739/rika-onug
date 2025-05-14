import { getPlayerNumbersByGivenConditions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, updateMark, updatePlayerKnownMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const assassinResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
    return gamestate
  }

  const apprenticeassassins = getPlayerNumbersByGivenConditions(gamestate, 'apprenticeAssassin')

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  updateMark(gamestate, token, [selected_mark_positions[0]], ['assassin'])

  if (currentPlayerNumber === selected_mark_positions[0]) {
    updatePlayerKnownMark(gamestate, token, 'mark_of_assassin')
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_assassin', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    uniqueInformation: { apprenticeassassins },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
