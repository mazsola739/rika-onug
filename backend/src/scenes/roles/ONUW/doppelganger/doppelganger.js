import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { doppelgangerAction } from './doppelganger.action'

//TODO if oracle is oracle team
export const doppelganger = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['doppelganger_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGANGER) {
      gamestate.players[token].action_finished = false

      action = doppelgangerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
