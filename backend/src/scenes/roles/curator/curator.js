import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { curatorAction } from './curator.action'

export const curator = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff`, 'curator_kickoff2']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'curator' && isActivePlayer(card).CURATOR) || (prefix === 'doppelganger_curator' && isActivePlayer(card).DOPPELGANGER_CURATOR)) {
      gamestate.players[token].action_finished = false

      action = curatorAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
