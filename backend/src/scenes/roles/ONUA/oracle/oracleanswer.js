import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, formatPlayerIdentifier, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { oracleResponses } from './oracle.constants'
import { oracleanswerAction } from './oracleanswer.action'

//ORACLE_ANSWER
export const oracleAnswer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const oracleQuestion = gamestate.oracle.question
  const oracleAnswer = gamestate.oracle.answer

  let narration = []

  switch (oracleQuestion) {
    case 'oracle_evenodd_text':
      if (oracleAnswer === 'even') {
        narration = ['oracle_evenodd_even_text']
      } else {
        narration = ['oracle_evenodd_odd_text']
      }
      break
    case 'oracle_guessnumber_text':
      if (oracleAnswer === 'success') {
        narration = ['oracle_guessnumber_success_text']
      } else {
        narration = ['oracle_guessnumber_failure_text']
        gamestate.oracle_target = true
      }
      break
    case 'oracle_ripple_text':
      if (oracleAnswer === 'yes') {
        gamestate.ripple = { force: true }
        narration = ['oracle_ripple_yes_text']
      } else {
        gamestate.ripple = { force: false }
        narration = ['oracle_ripple_no_text']
      }
      break
    case 'oracle_alienexchange_text':
      if (oracleAnswer === 'yes') {
        gamestate.alienexchange = true
        narration = ['oracle_alienexchange_yes_text']
      } else {
        gamestate.alienexchange = false
        narration = ['oracle_alienexchange_no_text']
      }
      break
    case 'oracle_alienteam_text':
    case 'oracle_werewolfteam_text':
    case 'oracle_vampireteam_text':
    case 'oracle_centerexchange_text':
    case 'oracle_viewcenter_text':
      if (oracleAnswer === 'yes') {
        const randomAfthermath = getRandomItemFromArray(oracleResponses[oracleQuestion].yes)
        narration = [randomAfthermath]
        gamestate.oracle.aftermath = randomAfthermath
      } else if (oracleAnswer === 'no') {
        gamestate.oracle.aftermath = oracleResponses[oracleQuestion].no
        narration = [oracleResponses[oracleQuestion].no]
      }
      break
    case 'oracle_viewplayer_text': {
      const yes = oracleResponses[oracleQuestion].yes
      const no = oracleResponses[oracleQuestion].no
      const options = yes.concat(no)
      const randomApproval = getRandomItemFromArray(options)
      const player = randomApproval === 'oracle_viewplayer_result_text' ? oracleAnswer : Math.floor(Math.random() * gamestate.total_players) + 1
      if (player !== oracleAnswer) {
        gamestate.oracle.answer = player
      }
      narration = [randomApproval, formatPlayerIdentifier([`player_${player}`])[0]]
      break
    }
  }

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ORACLE_ANSWER) {
      gamestate.players[token].action_finished = false

      action = oracleanswerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
