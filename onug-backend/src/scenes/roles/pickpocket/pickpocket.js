import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { pickpocketInteraction } from './pickpocket.interaction'

export const pickpocket = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'pickpocket') {
      if (card.player_original_id === 36 || (card.player_role_id === 36 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_pickpocket') {
      if (card.player_role_id === 36 && card.player_original_id === 1) {
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
