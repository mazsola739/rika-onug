import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { seerInteraction } from './seer.interaction'

export const seer = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['seer_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 9 || (card.player_role_id === 9 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = seerInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
