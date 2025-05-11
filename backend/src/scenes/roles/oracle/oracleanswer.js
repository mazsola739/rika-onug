import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, formatPlayerIdentifier, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { oracleResponses } from './oracle.constants'
import { oracleanswerAction } from './oracleanswer.action'

//ORACLE_ANSWER
export const oracleAnswer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const oracleQuestion = gamestate.roles.oracle.question
  const oracleAnswer = gamestate.roles.oracle.answer

  let narration = []

  switch (oracleQuestion) {
    case 'oracle_evenodd':
      if (oracleAnswer === 'even') {
        narration = ['oracle_evenodd_even']
      } else {
        narration = ['oracle_evenodd_odd']
      }
      break
    case 'oracle_guessnumber':
      if (oracleAnswer === 'success') {
        narration = ['oracle_guessnumber_success']
      } else {
        narration = ['oracle_guessnumber_failure']
        gamestate.oracle_target = true
      }
      break
    case 'oracle_ripple':
      if (oracleAnswer === 'yes') {
        gamestate.ripple = { force: true }
        narration = ['oracle_ripple_yes']
      } else {
        gamestate.ripple = { force: false }
        narration = ['oracle_ripple_no']
      }
      break
    case 'oracle_alienexchange':
      if (oracleAnswer === 'yes') {
        gamestate.alienexchange = true
        narration = ['oracle_alienexchange_yes']
      } else {
        gamestate.alienexchange = false
        narration = ['oracle_alienexchange_no']
      }
      break
    case 'oracle_alienteam':
    case 'oracle_werewolfteam':
    case 'oracle_vampireteam':
    case 'oracle_centerexchange':
    case 'oracle_viewcenter':
      if (oracleAnswer === 'yes') {
        const randomAfthermath = getRandomItemFromArray(oracleResponses[oracleQuestion].yes)
        narration = [randomAfthermath]
        gamestate.roles.oracle.aftermath = randomAfthermath
      } else if (oracleAnswer === 'no') {
        gamestate.roles.oracle.aftermath = oracleResponses[oracleQuestion].no
        narration = [oracleResponses[oracleQuestion].no]
      }
      break
    case 'oracle_viewplayer': {
      const yes = oracleResponses[oracleQuestion].yes
      const no = oracleResponses[oracleQuestion].no
      const options = yes.concat(no)
      const randomApproval = getRandomItemFromArray(options)
      const player = randomApproval === 'oracle_viewplayer_result' ? oracleAnswer : Math.floor(Math.random() * gamestate.total_players) + 1
      if (player !== oracleAnswer) {
        gamestate.roles.oracle.answer = player
      }
      narration = [randomApproval, ...formatPlayerIdentifier([`player_${player}`])]
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
