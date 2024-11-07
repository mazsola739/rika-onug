import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateMarkSelection } from '../../validators'

export const diseasedResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  if (gamestate.players[token].card.player_original_id === 1) {
    const diseasePosition = newGamestate.doppelganger_mark_positions.disease
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.disease = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  } else {
    const diseasePosition = newGamestate.mark_positions.disease
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.disease = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_disease: [selected_mark_positions[0]],
    scene_end: true
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_disease', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
