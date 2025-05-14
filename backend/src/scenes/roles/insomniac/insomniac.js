import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { insomniacAction } from './insomniac.action'

export const insomniac = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_insomniac_kickoff' : 'insomniac_kickoff', 'insomniac_kickoff2']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).INSOMNIAC) {
      gamestate.players[token].action_finished = false
      action = insomniacAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
