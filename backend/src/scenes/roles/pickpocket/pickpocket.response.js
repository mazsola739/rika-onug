import { getMarksByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const pickpocketResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentPlayerMark = gamestate.positions.card_positions[currentPlayerNumber].mark
  const selectedMark = gamestate.positions.card_positions[selected_mark_positions[0]].mark
  gamestate.positions.card_positions[currentPlayerNumber].mark = selectedMark
  gamestate.positions.card_positions[selected_mark_positions[0]].mark = currentPlayerMark

  gamestate.players[token].card.player_mark = gamestate.positions.card_positions[currentPlayerNumber].mark

  const showMarks = getMarksByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

  gamestate.players[token].card_or_mark_action = true

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_marks', ...messageIdentifiers, 'POINT', 'action_own_mark'],
    showMarks,
    uniqueInformation: { swapped_marks: [currentPlayerNumber, selected_mark_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
