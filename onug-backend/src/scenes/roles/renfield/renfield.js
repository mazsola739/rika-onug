import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { renfieldAction } from './renfield.action'

//TODO no vampire he is villager
export const renfield = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_renfield_kickoff_text' : 'renfield_kickoff_text', 'renfield_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).RENFIELD) {
      gamestate.players[token].action_finished = false
      action = renfieldAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
