import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { empathAction } from './empath.action'
import { empathNarration } from './empath.narration'

export const empath = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = empathNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card
    const activePlayerNumbers = gamestate.roles[prefix].active_player_numbers

    if ((prefix === 'empath' && isActivePlayer(card).EMPATH) || (prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGANGER_EMPATH) || activePlayerNumbers.includes(gamestate.players[token].player_number)) {
      gamestate.players[token].action_finished = false
      action = empathAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
