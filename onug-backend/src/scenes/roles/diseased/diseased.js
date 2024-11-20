import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { diseasedInteraction } from './diseased.interaction'

export const diseased = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['diseased_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DISEASED) {
      gamestate.players[token].action_finished = false
      interaction = diseasedInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
