import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { mysticwolfInteraction } from './mysticwolf.interaction'

export const mysticwolf = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['mysticwolf_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 22 || (card.player_role_id === 22 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = mysticwolfInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
