import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { assassinInteraction } from './assassin.interaction'

export const assassin = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'assassin') {
      if (card.player_original_id === 29 || (card.player_role_id === 29 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = assassinInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (card.player_role_id === 29 && card.player_original_id === 1) {
        interaction = assassinInteraction(newGamestate, token, title)
      }
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
