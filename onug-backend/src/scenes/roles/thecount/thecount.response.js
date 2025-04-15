import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const thecountResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const fearPosition = gamestate.doppelganger_mark_positions.fear
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.doppelganger_mark_positions.fear = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  } else {
    const fearPosition = gamestate.mark_positions.fear
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.mark_positions.fear = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_fear: [selected_mark_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_fear', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
