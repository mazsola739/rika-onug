import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const masonsAction = (gamestate, token, title) => {
  const masons = getPlayerNumbersByGivenConditions(gamestate.players, 'mason')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    masons,
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_masons'],
    uniqueInformation: { masons },
    scene_end: true
  })
}
