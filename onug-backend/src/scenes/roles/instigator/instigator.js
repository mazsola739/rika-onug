import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { instigatorInteraction } from './instigator.interaction'

export const instigator = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['instigator_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).INSTIGATOR) {
      gamestate.players[token].action_finished = false
      interaction = instigatorInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
