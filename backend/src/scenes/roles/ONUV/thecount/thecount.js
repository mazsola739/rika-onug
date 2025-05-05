import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { thecountAction } from './thecount.action'

export const thecount = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'thecount' && isActivePlayer(card).THE_COUNT) || (prefix === 'doppelganger_thecount' && isActivePlayer(card).DOPPELGANGER_THE_COUNT)) {
      gamestate.players[token].action_finished = false

      action = thecountAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
