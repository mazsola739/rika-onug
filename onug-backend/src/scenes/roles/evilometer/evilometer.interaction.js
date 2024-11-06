import {
  generateRoleInteraction,
  getPlayerNeighborsByToken,
} from '../../sceneUtils'
import { superVillainDetected } from './evilometer.constants'

export const evilometerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighborIsSuperVillain = superVillainDetected(
    newGamestate.players,
    token
  )
  const neighbors = getPlayerNeighborsByToken(newGamestate.players, 'both', 1)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    villain_neighbor: neighborIsSuperVillain ? neighbors : [],
    scene_end: true,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [
      neighborIsSuperVillain
        ? 'interaction_got_tapped_by_villain'
        : 'interaction_no_tap',
    ],
    uniqueInformations: {
      villain_neighbor: neighborIsSuperVillain ? neighbors : [],
    },
    scene_end: true,
  })
}
