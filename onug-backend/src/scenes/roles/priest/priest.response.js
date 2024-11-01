import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateMarkSelection } from '../../validators'

export const priestResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const selectedPositionMark = newGamestate.card_positions[selected_mark_positions[0]].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityTwoPosition = newGamestate.doppelganger_mark_positions.clarity_2
    newGamestate.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGamestate.doppelganger_mark_positions.clarity_2 = selectedPositionMark
  } else {
    const clarityTwoPosition = newGamestate.mark_positions.clarity_2
    newGamestate.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGamestate.mark_positions.clarity_2 = selectedPositionMark
  }

  newGamestate.players[token].player_history[title].mark_of_clarity = [
    ...newGamestate.players[token].player_history[title].mark_of_clarity, 
    selected_mark_positions[0]
  ]

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_clarity', formatPlayerIdentifier(selected_mark_positions)[0]],
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
