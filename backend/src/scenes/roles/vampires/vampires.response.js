import { formatPlayerIdentifier, generateRoleAction } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresResponse = async (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const vampirePosition = gamestate.positions.mark_positions.vampire
  const selectedPosition = gamestate.positions.card_positions[selected_mark_positions[0]].mark

  const isSwappedAlready = vampirePosition === selectedPosition

  //TODO updateMark use here?
  if (!isSwappedAlready) {
    gamestate.positions.mark_positions.vampire = selectedPosition
    gamestate.positions.card_positions[selected_mark_positions[0]].mark = vampirePosition
    gamestate.roles.vampires.new_vampire.push(selected_mark_positions[0])
  }

  gamestate.players[token].card_or_mark_action = true

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_vampire', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    uniqueInformation: { mark_of_vampire: [selected_mark_positions[0]], selected_mark_positions },
    scene_end: true
  })
}
