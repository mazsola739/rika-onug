import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { priestInteraction } from './priest.interaction'

export const priest = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'priest') {
      if (card.player_original_id === 37 || (card.player_role_id === 37 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = priestInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (card.player_role_id === 37 && card.player_original_id === 1) {
        interaction = priestInteraction(newGamestate, token, title)
      }
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
