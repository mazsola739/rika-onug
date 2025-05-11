import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const instigatorResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const traitorPosition = gamestate.positions.doppelganger_mark_positions.traitor
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.doppelganger_mark_positions.traitor = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = traitorPosition
  } else {
    const traitorPosition = gamestate.positions.mark_positions.traitor
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.mark_positions.traitor = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = traitorPosition
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  if (currentPlayerNumber === selected_mark_positions[0]) {
    gamestate.players[token].card.player_mark = 'mark_of_traitor'
  }

  gamestate.players[token].card_or_mark_action = true

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_traitor', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    uniqueInformation: { mark_of_traitor: [selected_mark_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
