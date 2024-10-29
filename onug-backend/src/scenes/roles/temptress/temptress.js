import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { temptressInteraction } from './temptress.interaction'

export const temptress = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['temptress_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}
 
    const card = newGamestate.players[token].card

    if (card.player_original_id === 69 || (card.player_role_id === 69 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = temptressInteraction(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction, narration })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
