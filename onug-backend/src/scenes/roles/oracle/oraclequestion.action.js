import { generateRoleAction } from '../../sceneUtils'

export const oraclequestionAction = (gamestate, token, title) => {
  const oracleQuestion = gamestate.oracle.question

  let answerOptions = []
  let scene_end = false
  let obligatory = false

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      answerOptions = Array.from({ length: gamestate.total_players }, (_, i) => `${i + 1}`)
      obligatory = true
      break
    case 'oracle_evenodd_text': {
      const isCurrentPlayerEven = parseInt(gamestate.players[token].player_number.split('_')[1], 10) % 2 === 0
      gamestate.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      scene_end = true
      break
    }
    case 'oracle_guessnumber_text':
      answerOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}`)
      obligatory = true
      break
    default:
      answerOptions = ['yes', 'no']
      obligatory = true
      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: answerOptions,
    scene_end,
    obligatory
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_oracle_question'],
    uniqueInformations: { answer_options: answerOptions },
    scene_end,
    obligatory
  })
}
