import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateMarkSelection } from '../../validators'

export const diseasedResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const diseasePosition = gamestate.doppelganger_mark_positions.disease
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.doppelganger_mark_positions.disease = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  } else {
    const diseasePosition = gamestate.mark_positions.disease
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.mark_positions.disease = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_disease: [selected_mark_positions[0]],
    scene_end: true
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_mark_of_disease', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
