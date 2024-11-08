import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { curatorInteraction } from './curator.interaction'

export const curator = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'curator_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'curator' && isActivePlayer(card).CURATOR) {
      newGamestate.players[token].action_finished = false
      interaction = curatorInteraction(newGamestate, token, title)
    } else if (prefix === 'doppelganger_curator' && isActivePlayer(card).DOPPELGÄNGER_CURATOR) {
      newGamestate.players[token].action_finished = false
      interaction = curatorInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
