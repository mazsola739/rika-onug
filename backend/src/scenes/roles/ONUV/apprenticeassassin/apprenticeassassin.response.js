import { getPlayerNumberWithMatchingToken, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateMarkSelection } from '../../../validators'

export const apprenticeassassinResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const assassinPosition = gamestate.positions.doppelganger_mark_positions.assassin
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.doppelganger_mark_positions.assassin = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = assassinPosition
  } else {
    const assassinPosition = gamestate.positions.mark_positions.assassin
    const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

    gamestate.positions.mark_positions.assassin = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    gamestate.players[token].card.player_mark = 'mark_of_assassin'
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_assassin: [selected_mark_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_assassin', formatPlayerIdentifier(selected_mark_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
