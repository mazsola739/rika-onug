import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateMarkSelection } from '../../../validators'

export const diseasedResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const diseasePosition = gamestate.positions.doppelganger_mark_positions.disease
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.doppelganger_mark_positions.disease = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = diseasePosition
  } else {
    const diseasePosition = gamestate.positions.mark_positions.disease
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.mark_positions.disease = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = diseasePosition
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_disease: [selected_mark_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_disease', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
