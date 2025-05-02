import { insomniacAction } from '../..'
import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'

export const selfawarenessgirl = (ws, gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_selfawarenessgirl_kickoff_text' : 'selfawarenessgirl_kickoff_text', 'selfawarenessgirl_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SELF_AWARENESS_GIRL) {
      gamestate.players[token].action_finished = false

      action = insomniacAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
