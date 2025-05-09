import { isActivePlayer } from '../../activePlayer'
import { hasAnyAlien, hasAnyVampire, hasAnyWerewolf } from '../../conditions'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomOracleQuestions } from './oracle.constants'
import { oraclequestionAction } from './oraclequestion.action'

export const oracleQuestion = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)

  let availableOracleQuestionOptions = [...randomOracleQuestions]

  if (!hasAnyAlien(selected_cards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('alien') && !question.includes('ripple'))
  }

  if (!hasAnyVampire(selected_cards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('vampire'))
  }

  if (!hasAnyWerewolf(selected_cards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('werewolf'))
  }

  const oracleQuestion = getRandomItemFromArray(availableOracleQuestionOptions)
  const theNumberIThinkingOf = 0 //TODO eyes open!! Math.floor(Math.random() * 10) + 1

  const narration = ['oracle_kickoff', oracleQuestion]

  gamestate.roles.oracle.number = theNumberIThinkingOf
  gamestate.roles.oracle.question = oracleQuestion

  switch (oracleQuestion) {
    case 'oracle_viewplayer':
      gamestate.roles.oracle.answer = '1'
      break
    case 'oracle_evenodd':
      gamestate.roles.oracle.answer = 'even'
      break
    case 'oracle_guessnumber':
      gamestate.roles.oracle.answer = 'failure'
      break
    default:
      gamestate.roles.oracle.answer = 'no'
      break
  }

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ORACLE_QUESTION) {
      gamestate.players[token].action_finished = false

      action = oraclequestionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
