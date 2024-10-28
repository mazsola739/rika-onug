import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { troublemakerInteraction } from './troublemaker.interaction'

//todo why see?
export const troublemaker = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []  
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['troublemaker_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 11 || (card.player_role_id === 11 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = troublemakerInteraction(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
