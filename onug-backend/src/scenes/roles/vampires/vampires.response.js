import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresResponse = async (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const vampirePosition = gamestate.mark_positions.vampire
  const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

  const isSwappedAlready = vampirePosition === selectedPosition

  if (!isSwappedAlready) {
    gamestate.mark_positions.vampire = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = vampirePosition
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_vampire: [selected_mark_positions[0]],
    scene_end: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier([selected_mark_positions[0]])[0]],
    scene_end: true
  })
}
