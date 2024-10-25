import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { robberInteraction } from '..'

export const roleretriever = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['roleretriever_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 66 || (card.player_role_id === 66 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = robberInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
