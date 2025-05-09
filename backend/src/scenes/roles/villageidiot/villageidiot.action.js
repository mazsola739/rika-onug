import { generateRoleAction } from '../../sceneUtils'

export const villageidiotAction = (gamestate, token, title) => {
  const answer_options = ['left', 'right']

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options,
    obligatory: false
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_direction'],
    uniqueInformation: { answer_options },
    obligatory: false
  })
}
