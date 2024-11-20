import { formatPlayerIdentifier, generateRoleInteraction, getPlayerTokenByPlayerNumber } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresvoteResponse = async (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const vampirePosition = newGamestate.mark_positions.vampire
  const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

  const victimToken = getPlayerTokenByPlayerNumber(newGamestate.players, selected_mark_positions[0])
  const isSwappedAlready = vampirePosition === newGamestate.players[victimToken].card.player_mark

  if (!isSwappedAlready) {
    newGamestate.mark_positions.vampire = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = vampirePosition
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_vampire: [selected_mark_positions[0]],
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier([selected_mark_positions[0]])[0]],
    scene_end: true
  })
}
