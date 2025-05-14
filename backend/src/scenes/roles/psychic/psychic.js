import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { psychicAction } from './psychic.action'
import { psychicNarration } from './psychic.narration'

export const psychic = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = psychicNarration(gamestate, prefix)
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'psychic' && isActivePlayer(card).PSYCHIC) || (prefix === 'doppelganger_psychic' && isActivePlayer(card).DOPPELGANGER_PSYCHIC)) {
      gamestate.players[token].action_finished = false
      action = psychicAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
