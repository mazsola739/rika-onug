import { generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const oraclequestionResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const oracleQuestion = gamestate.roles.oracle.question

  if (oracleQuestion === 'oracle_guessnumber') {
    const answer = +selected_answer
    const number = gamestate.roles.oracle.number
    if (answer === number) {
      gamestate.roles.oracle.answer = 'success'
    } else {
      gamestate.roles.oracle.answer = 'failure'
    }
  } else {
    gamestate.roles.oracle.answer = selected_answer
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_oracle_answer', `button_label_${selected_answer}`],
    uniqueInformation: { question: oracleQuestion, selected_answer },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
