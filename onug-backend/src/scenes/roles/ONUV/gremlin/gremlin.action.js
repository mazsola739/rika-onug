import { generateRoleAction } from '../../../sceneUtils'

export const gremlinAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: ['cards', 'marks'],
    obligatory: true
  }

  //TODO if no marks only cards

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_two_any'],
    uniqueInformation: { answer_options: ['cards', 'marks'] },
    obligatory: true
  })
}
