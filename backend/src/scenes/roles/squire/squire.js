import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { squireAction } from './squire.action'

export const squire = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_squire_kickoff' : 'squire_kickoff', 'squire_kickoff2']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).SQUIRE) {
      gamestate.players[token].action_finished = false
      action = squireAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
