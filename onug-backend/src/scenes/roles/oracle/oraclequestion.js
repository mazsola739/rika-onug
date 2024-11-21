import { isActivePlayer } from '../../activePlayer'
import { hasAnyAlien, hasAnyVampire, hasAnyWerewolf } from '../../conditions'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomOracleQuestions } from './oracle.constants'
import { thinkRandomNumber } from './oracle.utils'
import { oracleQuestionRaising } from './oraclequestion.raising'

//ORACLE_QUESTION
export const oracleQuestion = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const selectedCards = gamestate.selected_cards

  let availableOracleQuestionOptions = []

  if (!hasAnyAlien(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('alien') || !question.includes('ripple'))
  } else if (!hasAnyVampire(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('vampire'))
  } else if (!hasAnyWerewolf(selectedCards)) {
    availableOracleQuestionOptions = randomOracleQuestions.filter(question => !question.includes('werewolf'))
  }

  const oracleQuestion = getRandomItemFromArray(availableOracleQuestionOptions)
  const theNumberIThinkingOf = thinkRandomNumber()

  const narration = ['oracle_kickoff_text', oracleQuestion]

  gamestate.oracle = {
    question: '',
    answer: '',
    aftermath: ''
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
      gamestate.oracle.number = `${theNumberIThinkingOf}`
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
      gamestate.players[token].player_history[title].oracle = narration[1]
      gamestate.players[token].action_finished = false
      action = oracleQuestionRaising(gamestate, token, title)
    } else {
      console.log('do nothing')
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
