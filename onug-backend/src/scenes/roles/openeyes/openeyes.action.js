import { generateRoleAction, getMarksByPositions, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
//TODO
export const openeyesAction = (gamestate, token, title) => {

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [''],
    scene_end: true
  })
}
