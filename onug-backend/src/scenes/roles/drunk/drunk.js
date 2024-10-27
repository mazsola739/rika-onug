import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { drunkInteraction } from './drunk.interaction'

export const drunk = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['drunk_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 2 || (card.player_role_id === 2 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = drunkInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
