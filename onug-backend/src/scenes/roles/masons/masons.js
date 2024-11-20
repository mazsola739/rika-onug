import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { masonsInteraction } from './masons.interaction'

export const masons = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['masons_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).MASONS) {
      gamestate.players[token].action_finished = false
      interaction = masonsInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
