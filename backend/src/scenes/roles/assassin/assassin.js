import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { assassinAction } from './assassin.action'

export const assassin = (gamestate, title, hasApprenticeAssassin, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text', hasApprenticeAssassin && 'assassin_appassassin_assassin_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'assassin' && isActivePlayer(card).ASSASSIN) || (prefix === 'doppelganger_assassin' && isActivePlayer(card).DOPPELGANGER_ASSASSIN)) {
      gamestate.players[token].action_finished = false

      action = assassinAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
