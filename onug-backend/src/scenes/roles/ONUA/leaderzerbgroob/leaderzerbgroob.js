import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { leaderZerbgroobAction } from './leaderzerbgroob.action'

export const leaderzerbgroob = (ws, gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['leader_zerbgroob_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).LEADER_ZERB_GROOB) {
      gamestate.players[token].action_finished = false

      action = leaderZerbgroobAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
