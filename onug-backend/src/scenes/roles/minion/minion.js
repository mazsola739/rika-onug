import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { minionAction } from './minion.action'

export const minion = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_minion_kickoff_text' : 'minion_kickoff_text', 'minion_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).MINION) {
      gamestate.players[token].action_finished = false
      action = minionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
