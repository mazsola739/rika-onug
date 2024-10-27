import { getPlayerNumberWithMatchingToken, getMarksByPositions, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const pickpocketResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerMark = newGamestate.card_positions[currentPlayerNumber].mark 
  const selectedMark = newGamestate.card_positions[selected_mark_positions[0]].mark 
  newGamestate.card_positions[currentPlayerNumber].mark = selectedMark
  newGamestate.card_positions[selected_mark_positions[0]].mark = currentPlayerMark

  newGamestate.players[token].card.player_mark = newGamestate.card_positions[currentPlayerNumber].mark

  const viewMarks = getMarksByPositions(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_marks: [currentPlayerNumber, selected_mark_positions[0]],
    viewed_marks: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_marks', ...messageIdentifiers, 'interaction_own_mark'],
    showMarks: viewMarks,
  })

  scene.push({ [token]: { interaction } })
  newGamestate.scene[title] = scene

  return newGamestate
}
