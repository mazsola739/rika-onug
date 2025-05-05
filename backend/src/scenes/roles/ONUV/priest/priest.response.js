import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateMarkSelection } from '../../../validators'

export const priestResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedPositionMark = gamestate.positions.card_positions[selected_mark_positions[0]].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityTwoPosition = gamestate.positions.doppelganger_mark_positions.clarity_2
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    gamestate.positions.doppelganger_mark_positions.clarity_2 = selectedPositionMark
  } else {
    const clarityTwoPosition = gamestate.positions.mark_positions.clarity_2
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    gamestate.positions.mark_positions.clarity_2 = selectedPositionMark
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_clarity: selected_mark_positions[0],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_clarity', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
