import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { robberInteraction } from './robber.interaction'

export const robber = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['robber_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ROBBER) {
      gamestate.players[token].action_finished = false
      interaction = robberInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
