import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { temptressAction } from './temptress.action'

export const temptress = (ws, gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['temptress_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).TEMPTRESS) {
      gamestate.players[token].action_finished = false

      action = temptressAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
