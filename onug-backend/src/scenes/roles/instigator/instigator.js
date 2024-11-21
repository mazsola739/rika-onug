import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instigatorInteraction } from './instigator.action'

export const instigator = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['instigator_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).INSTIGATOR) {
      gamestate.players[token].action_finished = false
      action = instigatorInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
