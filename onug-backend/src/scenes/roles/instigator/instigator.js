import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { instigatorInteraction } from './instigator.interaction'

export const instigator = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['instigator_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 34 || (card.player_role_id === 34 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = instigatorInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
