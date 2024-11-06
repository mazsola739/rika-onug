import { generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'
import { formatOracleAnswer } from './oracle.utils'

export const oracleQuestionResponse = (
  gamestate,
  token,
  selected_answer,
  title
) => {
  if (
    !validateAnswerSelection(
      selected_answer,
      gamestate.players[token].player_history,
      title
    )
  ) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const oracleQuestion = newGamestate.oracle.question

  if (oracleQuestion === 'oracle_guessnumber_text') {
    const answer = selected_answer
    const number = newGamestate.oracle.number
    if (answer === number) {
      newGamestate.oracle.answer = 'success'
    } else {
      newGamestate.oracle.answer = 'failure'
    }
  } else {
    newGamestate.oracle.answer = selected_answer
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    question: oracleQuestion,
    answer: selected_answer,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: [
      'interaction_oracle_answer',
      formatOracleAnswer(selected_answer),
    ],
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
