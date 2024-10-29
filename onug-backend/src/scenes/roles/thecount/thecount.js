import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { thecountInteraction } from './thecount.interaction'

export const thecount = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'thecount') {
      if (card.player_original_id === 39 || (card.player_role_id === 39 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = thecountInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (card.player_role_id === 39 && card.player_original_id === 1) {
        interaction = thecountInteraction(newGamestate, token, title)
      }
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction, narration })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
