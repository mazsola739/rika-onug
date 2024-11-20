import { mysticwolfInteraction } from '..'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const drpeeker = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['drpeeker_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DR_PEEKER) {
      gamestate.players[token].action_finished = false
      interaction = mysticwolfInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
