import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { alphawolfInteraction } from './alphawolf.interaction'

export const alphawolf = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['alphawolf_kickoff_text']
  
  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 17 || (card.player_role_id === 17 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = alphawolfInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
