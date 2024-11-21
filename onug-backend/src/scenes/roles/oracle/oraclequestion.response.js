import { generateRoleAction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'
import { formatOracleAnswer } from './oracle.utils'

export const oracleQuestionResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const oracleQuestion = gamestate.oracle.question

  if (oracleQuestion === 'oracle_guessnumber_text') {
    const answer = selected_answer
    const number = gamestate.oracle.number
    if (answer === number) {
      gamestate.oracle.answer = 'success'
    } else {
      gamestate.oracle.answer = 'failure'
    }
  } else {
    gamestate.oracle.answer = selected_answer
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    question: oracleQuestion,
    answer: selected_answer
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['interaction_oracle_answer', formatOracleAnswer(selected_answer)]
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
