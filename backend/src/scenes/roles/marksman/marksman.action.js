import { generateRoleAction } from '../../sceneUtils'

export const marksmanAction = (gamestate, token, title) => {
  const answer_options = ['cards', 'marks']

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options,
    obligatory: true
  }

  //TODO if no marks only cards

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any'],
    uniqueInformation: { answer_options },
    obligatory: true
  })
}
