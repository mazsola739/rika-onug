import { generateRoleInteraction } from '../../sceneUtils'
import { getMasonPlayerNumbersByRoleIds } from './masons.utils'

export const masonsInteraction = (gamestate, token, title) => {
  const masons = getMasonPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    masons,
    scene_end: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_masons'],
    uniqueInformations: { masons },
    scene_end: true
  })
}
