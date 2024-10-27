import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { seerInteraction } from '..'

export const detector = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['detector_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 56 || (card.player_role_id === 56 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = seerInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
