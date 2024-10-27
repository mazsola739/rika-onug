import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { thingInteraction } from './thing.interaction'

export const thing = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['thing_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 85 || (card.player_role_id === 85 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = thingInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })
  
  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
