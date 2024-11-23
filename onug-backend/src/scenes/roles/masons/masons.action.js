import { generateRoleAction } from '../../sceneUtils'
import { getMasonPlayerNumbersByRoleIds } from '../../sceneUtils/getMasonPlayerNumbersByRoleIds'

export const masonsAction = (gamestate, token, title) => {
  const masons = getMasonPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    masons,
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_masons'],
    uniqueInformations: { masons },
    scene_end: true
  })
}
