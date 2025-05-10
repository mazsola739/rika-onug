import { generateRoleAction } from '../../sceneUtils'

const generateAnswerOptions = length => Array.from({ length }, (_, i) => `${i + 1}`)

export const oraclequestionAction = (gamestate, token, title) => {
  const oracleQuestion = gamestate.roles.oracle.question

  let answer_options = []
  let scene_end = false
  const obligatory = ['oracle_viewplayer', 'oracle_guessnumber', 'default'].includes(oracleQuestion)

  switch (oracleQuestion) {
    case 'oracle_viewplayer':
      answer_options = generateAnswerOptions(gamestate.total_players)
      break
    case 'oracle_evenodd': {
      const isCurrentPlayerEven = parseInt(gamestate.players[token].player_number.split('_')[1], 10) % 2 === 0
      gamestate.roles.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      scene_end = true
      break
    }
    case 'oracle_guessnumber':
      answer_options = generateAnswerOptions(10)
      break
    default:
      answer_options = ['yes', 'no']
      break
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_oracle_question'],
    uniqueInformation: { answer_options },
    scene_end,
    obligatory
  })
}
