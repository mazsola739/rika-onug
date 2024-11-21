import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateMarkSelection } from '../../validators'

export const instigatorResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const traitorPosition = gamestate.doppelganger_mark_positions.traitor
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.doppelganger_mark_positions.traitor = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = traitorPosition
  } else {
    const traitorPosition = gamestate.mark_positions.traitor
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.mark_positions.traitor = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = traitorPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    gamestate.players[token].card.player_mark = 'mark_of_traitor'
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_traitor: [selected_mark_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['interaction_mark_of_traitor', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
