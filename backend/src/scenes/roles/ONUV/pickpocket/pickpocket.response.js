import { getPlayerNumberWithMatchingToken, getMarksByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateMarkSelection } from '../../../validators'

export const pickpocketResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerMark = gamestate.card_positions[currentPlayerNumber].mark
  const selectedMark = gamestate.card_positions[selected_mark_positions[0]].mark
  gamestate.card_positions[currentPlayerNumber].mark = selectedMark
  gamestate.card_positions[selected_mark_positions[0]].mark = currentPlayerMark

  gamestate.players[token].card.player_mark = gamestate.card_positions[currentPlayerNumber].mark

  const viewMarks = getMarksByPositions(gamestate.card_positions, [currentPlayerNumber])

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_marks: [currentPlayerNumber, selected_mark_positions[0]],
    viewed_marks: [currentPlayerNumber],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_marks', ...messageIdentifiers, 'POINT', 'action_own_mark'],
    showMarks: viewMarks,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
