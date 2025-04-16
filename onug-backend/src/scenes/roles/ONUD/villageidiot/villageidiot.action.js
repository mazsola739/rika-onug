import { generateRoleAction } from '../../../sceneUtils'

export const villageidiotAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: ['left', 'right'],
    obligatory: false
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_direction'],
    uniqueInformation: { answer_options: ['left', 'right'] },
    obligatory: false
  })
}
