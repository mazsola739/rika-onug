import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { masonsInteraction } from './masons.interaction'

export const masons = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['masons_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.MASONS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = masonsInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
