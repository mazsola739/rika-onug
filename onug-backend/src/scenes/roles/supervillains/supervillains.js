import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { supervillainsInteraction } from './supervillains.interaction'

export const supervillains = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['supervillains_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SUPER_VILLAINS) {
      gamestate.players[token].action_finished = false
      interaction = supervillainsInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
