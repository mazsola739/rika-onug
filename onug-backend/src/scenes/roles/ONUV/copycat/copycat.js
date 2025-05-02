import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { copycatAction } from './copycat.action'

//TODO if oracle is oracle team
export const copycat = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['copycat_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).COPYCAT) {
      gamestate.players[token].action_finished = false

      action = copycatAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
