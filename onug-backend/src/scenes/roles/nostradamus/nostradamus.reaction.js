/* import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils' */
import { getNostradamusTeam } from './nostradamus.utils'

export const nostradamusReaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
/*   const tokens = getAllPlayerTokens(newGamestate.players)   */
  const nostradamusTeam = getNostradamusTeam(newGamestate.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]

/*   
tokens.forEach((token) => { newGamestate.players[token].action_finished = false
createAndSendSceneMessage(newGamestate, token, title, interaction, narration)}) */

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
