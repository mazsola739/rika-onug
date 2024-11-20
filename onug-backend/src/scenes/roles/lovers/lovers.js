import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { loversInteraction } from './lovers.interaction'

export const lovers = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['lovers_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).LOVERS) {
      gamestate.players[token].action_finished = false
      interaction = loversInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
