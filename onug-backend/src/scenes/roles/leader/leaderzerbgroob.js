import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { leaderZerbgroobInteraction } from './leaderzerbgroob.interaction'

export const leaderzerbgroob = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['leader_zerbgroob_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = leaderZerbgroobInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
