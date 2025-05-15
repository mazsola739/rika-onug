import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { morticianAction } from './mortician.action'
import { morticianNarration } from './mortician.narration'

export const mortician = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = morticianNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'mortician' && isActivePlayer(card).MORTICIAN) || (prefix === 'doppelganger_mortician' && isActivePlayer(card).DOPPELGANGER_MORTICIAN)) {
      gamestate.players[token].action_finished = false
      action = morticianAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
