import { generateRoleInteraction } from '../../sceneUtils'
import { createNumberArray, isCurrentPlayerNumberEven } from './oracle.utils'

export const oracleQuestionRaising = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const oracleQuestion = newGamestate.oracle.question

  let answerOptions = []

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      answerOptions = createNumberArray(newGamestate.total_players)
      break
    case 'oracle_evenodd_text': {
      const isCurrentPlayerEven = isCurrentPlayerNumberEven(newGamestate.players, token)
      newGamestate.oracle.answer = isCurrentPlayerEven ? 'even' : 'odd'
      break
    }
    case 'oracle_guessnumber_text':
      answerOptions = createNumberArray(10)
      break
    default:
      answerOptions = ['yes', 'no']
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    answer_options: answerOptions
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_oracle_question']
  })
}
