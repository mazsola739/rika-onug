import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { mysticwolfInteraction } from '..'

export const drpeeker = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['drpeeker_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 57 || (card.player_role_id === 57 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = mysticwolfInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
