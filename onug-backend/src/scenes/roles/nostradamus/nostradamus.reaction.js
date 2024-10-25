import { SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { getNostradamusTeam } from './nostradamus.utils'

export const nostradamusReaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const nostradamusTeam = getNostradamusTeam(newGamestate.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]

  tokens.forEach((token) => { scene.push({ type: SCENE, title, token, narration })})

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
