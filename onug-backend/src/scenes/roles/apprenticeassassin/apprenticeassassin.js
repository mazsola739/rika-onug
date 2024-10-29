import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeassassinInteraction } from './apprenticeassassin.interaction'

export const apprenticeassassin = (gamestate, title, hasAssassin, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, hasAssassin ? 'apprenticeassassin_assassin_text' : 'apprenticeassassin_alone_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'apprenticeassassin') {
      if (card.player_original_id === 28 || (card.player_role_id === 28 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = apprenticeassassinInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_apprenticeassassin') {
      if (card.player_role_id === 28 && card.player_original_id === 1) {
        interaction = apprenticeassassinInteraction(newGamestate, token, title)
      }
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction, narration })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
