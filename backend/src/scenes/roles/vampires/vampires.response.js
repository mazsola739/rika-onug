import { createAndSendSceneMessage, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, updateMark } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresResponse = async (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
    return gamestate
  }
  const isSwappedAlready = gamestate.positions.mark_positions.vampire === gamestate.positions.card_positions[selected_mark_positions[0]].mark

  if (!isSwappedAlready) {
    updateMark(gamestate, token, [selected_mark_positions[0]], ['vampire'])
    gamestate.roles.vampires.new_vampire.push(selected_mark_positions[0])
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_mark_of_vampire', ...formatPlayerIdentifier([selected_mark_positions[0]])],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
