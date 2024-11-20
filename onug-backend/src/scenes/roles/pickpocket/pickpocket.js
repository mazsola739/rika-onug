import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { pickpocketInteraction } from './pickpocket.interaction'

export const pickpocket = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'pickpocket' && isActivePlayer(card).PICKPOCKET) {
      gamestate.players[token].action_finished = false
      interaction = pickpocketInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_pickpocket' && isActivePlayer(card).DOPPELGÄNGER_PICKPOCKET) {
      gamestate.players[token].action_finished = false
      interaction = pickpocketInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
