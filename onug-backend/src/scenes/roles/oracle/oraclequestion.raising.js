import { generateRoleInteraction } from '../../sceneUtils'
import { createNumberArray, isCurrentPlayerNumberEven } from './oracle.utils'

export const oracleQuestionRaising = (gamestate, token, title) => {
  const oracleQuestion = gamestate.oracle.question

  let answerOptions = []

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      answerOptions = createNumberArray(gamestate.total_players)
      break
    case 'oracle_evenodd_text': {
      const isCurrentPlayerEven = isCurrentPlayerNumberEven(gamestate.players, token)
      gamestate.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      break
    }
    case 'oracle_guessnumber_text':
      answerOptions = createNumberArray(10)
      break
    default:
      answerOptions = ['yes', 'no']
      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    answer_options: answerOptions
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_oracle_question']
  })
}
