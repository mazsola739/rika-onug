import { isActivePlayer } from '../../activePlayer'
import { hasAnyAlien, hasAnyVampire, hasAnyWerewolf } from '../../conditions'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomOracleQuestions } from './oracle.constants'
import { oraclequestionAction } from './oraclequestion.action'

//ORACLE_QUESTION
export const oracleQuestion = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const selectedCards = gamestate.selected_cards

  let availableOracleQuestionOptions = [...randomOracleQuestions]

  if (!hasAnyAlien(selectedCards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('alien') && !question.includes('ripple'))
  }

  if (!hasAnyVampire(selectedCards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('vampire'))
  }

  if (!hasAnyWerewolf(selectedCards)) {
    availableOracleQuestionOptions = availableOracleQuestionOptions.filter(question => !question.includes('werewolf'))
  }

  const oracleQuestion = getRandomItemFromArray(availableOracleQuestionOptions)
  const theNumberIThinkingOf = /* Math.floor(Math.random() * 10) + 1  //TODO eyes open */ 0

  const narration = ['oracle_kickoff_text', oracleQuestion]

  gamestate.oracle = {
    question: '',
    number: theNumberIThinkingOf,
    answer: '',
    aftermath: '',
    openeyes: false,
    target: false
  }
  gamestate.oracle.question = oracleQuestion

  switch (oracleQuestion) {
    case 'oracle_viewplayer_text':
      gamestate.oracle.answer = '1'
      break
    case 'oracle_evenodd_text':
      gamestate.oracle.answer = 'even'
      break
    case 'oracle_guessnumber_text':
      gamestate.oracle.answer = 'failure'
      break
    default:
      gamestate.oracle.answer = 'no'
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

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
