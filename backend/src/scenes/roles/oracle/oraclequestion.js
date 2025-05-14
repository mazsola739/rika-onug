import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { oraclequestionAction } from './oraclequestion.action'
import { oraclequestionNarration } from './oraclequestion.narration'

export const oracleQuestion = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = oraclequestionNarration(gamestate, selected_cards)
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ORACLE_QUESTION) {
      gamestate.players[token].action_finished = false
      action = oraclequestionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
