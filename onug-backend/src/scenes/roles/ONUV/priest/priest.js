import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { priestAction } from './priest.action'

export const priest = (ws, gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'priest' && isActivePlayer(card).PRIEST) || (prefix === 'doppelganger_priest' && isActivePlayer(card).DOPPELGANGER_PRIEST)) {
      gamestate.players[token].action_finished = false

      action = priestAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
