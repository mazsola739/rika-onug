import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { empathAction } from './empath.action'
import { empathNarration } from './empath.narration'

export const empath = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const { narration, activePlayerNumbers } = empathNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'empath' && isActivePlayer(card).EMPATH) || (prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGANGER_EMPATH)) {
      action = empathAction(gamestate, token, title) //OPEN EYES
    } else if (activePlayerNumbers.includes(gamestate.players[token].player_number)) {
      action = empathAction(gamestate, token, title) //CLOSE EYES
    }

    gamestate.players[token].action_finished = false

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
