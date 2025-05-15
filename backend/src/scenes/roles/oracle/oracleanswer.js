import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { oracleanswerAction } from './oracleanswer.action'
import { oracleanswerNarration } from './oracleanswer.narration'

export const oracleAnswer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = oracleanswerNarration(gamestate)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ORACLE_ANSWER) {
      gamestate.players[token].action_finished = false
      action = oracleanswerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
