import { generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const oraclequestionResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const oracleQuestion = gamestate.oracle.question

  if (oracleQuestion === 'oracle_guessnumber') {
    const answer = +selected_answer
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
    answer: selected_answer,
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_oracle_answer', `button_label_${selected_answer}`],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
