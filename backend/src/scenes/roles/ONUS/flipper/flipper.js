import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { flipperAction } from './flipper.action'

export const flipper = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'flipper' && isActivePlayer(card).FLIPPER) || (prefix === 'doppelganger_flipper' && isActivePlayer(card).DOPPELGANGER_FLIPPER)) {
      gamestate.players[token].action_finished = false

      action = flipperAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
