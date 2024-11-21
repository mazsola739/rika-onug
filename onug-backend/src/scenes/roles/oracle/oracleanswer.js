import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { oracleResponses } from './oracle.constants'
import { oracleAnswerAftermath } from './oracleanswer.aftermath'

//ORACLE_ANSWER
export const oracleAnswer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const oracleQuestion = gamestate.oracle.question
  const oracleAnswer = gamestate.oracle.answer

  let narration = []
  let aftermath = false

  switch (oracleQuestion) {
    case 'oracle_evenodd_text':
      if (oracleAnswer === 'even') {
        narration = ['oracle_evenodd_even_text']
      } else {
        narration = ['oracle_evenodd_odd_text']
      }
      break
    case 'oracle_guessnumber_text':
      aftermath = true
      if (oracleAnswer === 'success') {
        narration = ['oracle_guessnumber_success_text']
      } else {
        narration = ['oracle_guessnumber_failure_text']
      }
      break
    case 'oracle_viewplayer_text': {
      const yes = oracleResponses[oracleQuestion].yes
      const no = oracleResponses[oracleQuestion].no
      const options = yes.concat(no)
      narration = [getRandomItemFromArray(options)]
      break
    }
    case 'oracle_alienexchange_text':
      aftermath = true
      if (oracleAnswer === 'yes') {
        gamestate.alienexchange = true
        narration = ['oracle_alienexchange_yes_text']
      } else {
        gamestate.alienexchange = false
        narration = ['oracle_alienexchange_no_text']
      }
      break
    case 'oracle_ripple_text':
      aftermath = true
      if (oracleAnswer === 'yes') {
        gamestate.ripple = true
        narration = ['oracle_ripple_yes_text']
      } else {
        gamestate.ripple = false
        narration = ['oracle_ripple_no_text']
      }
      break
    default:
      if (oracleAnswer === 'yes') {
        aftermath = true
        narration = [getRandomItemFromArray(oracleResponses[oracleQuestion].yes)]
      } else {
        narration = [getRandomItemFromArray(oracleResponses[oracleQuestion].no)]
      }
      break
  }

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (aftermath && isActivePlayer(card).ORACLE_ANSWER) {
      gamestate.oracle.aftermath = narration[0]
      gamestate.players[token].action_finished = false
      action = oracleAnswerAftermath(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
