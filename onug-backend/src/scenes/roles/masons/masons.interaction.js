import { generateRoleInteraction } from '../../sceneUtils'
import { getMasonPlayerNumbersByRoleIds } from './masons.utils'

export const masonsInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const masons = getMasonPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    masons,
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_masons'],
    uniqueInformations: { masons },
    scene_end: true
  })
}
