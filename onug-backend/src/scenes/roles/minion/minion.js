import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { minionInteraction } from './minion.interaction'

export const minion = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_minion_kickoff_text' : 'minion_kickoff_text', 'minion_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).MINION) {
      gamestate.players[token].action_finished = false
      interaction = minionInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
