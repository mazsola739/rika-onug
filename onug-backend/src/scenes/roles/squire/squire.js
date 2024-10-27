import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { squireInteraction } from './squire.interaction'

export const squire = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 83 || (card.player_role_id === 27 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = squireInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
