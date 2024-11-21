import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { pickpocketAction } from './pickpocket.action'

export const pickpocket = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'pickpocket' && isActivePlayer(card).PICKPOCKET) {
      gamestate.players[token].action_finished = false
      action = pickpocketAction(gamestate, token, title)
    } else if (prefix === 'doppelganger_pickpocket' && isActivePlayer(card).DOPPELGÄNGER_PICKPOCKET) {
      gamestate.players[token].action_finished = false
      action = pickpocketAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
