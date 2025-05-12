import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { villageidiotAction } from '../villageidiot/villageidiot.action'
import { rascalAction } from './rascal.action'
import { rascalNarration } from './rascal.narration'

export const rascal = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = rascalNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'rascal' && isActivePlayer(card).RASCAL) || (prefix === 'doppelganger_rascal' && isActivePlayer(card).DOPPELGANGER_RASCAL)) {
      if (gamestate.roles[prefix].instruction === 'rascal_idiot') {
        gamestate.players[token].action_finished = false

        action = villageidiotAction(gamestate, token, title)
      } else {
        gamestate.players[token].action_finished = false

        action = rascalAction(gamestate, token, title, prefix)
      }
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
