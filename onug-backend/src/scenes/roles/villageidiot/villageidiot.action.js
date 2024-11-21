import { generateRoleAction } from '../../sceneUtils'

export const villageidiotAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: ['left', 'right']
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_direction'],
    uniqueInformations: { answer_options: ['left', 'right'] }
  })
}
