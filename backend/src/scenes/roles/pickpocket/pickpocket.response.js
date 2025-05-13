import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, swapMarks } from '../../sceneUtils'
import { sawMarks } from '../../sceneUtils/sawMarks'
import { validateMarkSelection } from '../../validators'

export const pickpocketResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  swapMarks(gamestate, token, currentPlayerNumber, selected_mark_positions[0], true)
  const showMarks = sawMarks(gamestate, [currentPlayerNumber], token)

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_marks', ...messageIdentifiers, 'POINT', 'action_own_mark'],
    showMarks,
    uniqueInformation: { swapped_marks: [currentPlayerNumber, selected_mark_positions[0]], selected_mark_positions },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
