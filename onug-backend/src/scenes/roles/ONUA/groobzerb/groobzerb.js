import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { groobzerbAction } from './groobzerb.action'

export const groobzerb = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_groobzerb_kickoff_text' : 'groobzerb_kickoff_text', 'groobzerb_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).GROOB_ZERB) {
      gamestate.players[token].action_finished = false

      action = groobzerbAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
