import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { flipperInteraction } from './flipper.interaction'

export const flipper = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'flipper') {
      if (card.player_original_id === 59 || (card.player_role_id === 59 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = flipperInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_flipper') {
      if (card.player_role_id === 59 && card.player_original_id === 1) {
        interaction = flipperInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
