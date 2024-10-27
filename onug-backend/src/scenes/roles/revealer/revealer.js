import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { revealerInteraction } from './revealer.interaction'

export const revealer = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'revealer_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'revealer') {
      if (card.player_original_id === 24 || (card.player_role_id === 24 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = revealerInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_revealer') {
      if (card.player_role_id === 24 && card.player_original_id === 1) {
        interaction = revealerInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
