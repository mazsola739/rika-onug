import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { empathAction, empathEveryoneAction } from './empath.action'
import { empathNarration } from './empath.narration'

//TODO fix non-empaths voting

export const empath = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = empathNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'empath' && isActivePlayer(card).EMPATH) || (prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGANGER_EMPATH)) {
      action = empathAction(gamestate, token, title, prefix)
    } else {
      action = empathEveryoneAction(gamestate, token, title, prefix)
    }

    gamestate.players[token].action_finished = false

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
