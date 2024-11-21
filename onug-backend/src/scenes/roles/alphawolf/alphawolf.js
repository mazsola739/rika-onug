import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { alphawolfAction } from './alphawolf.action'

export const alphawolf = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['alphawolf_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALPHA_WOLF) {
      gamestate.players[token].action_finished = false
      action = alphawolfAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
