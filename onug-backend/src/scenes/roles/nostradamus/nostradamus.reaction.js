/* import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils' */
import { getNostradamusTeam } from '../../sceneUtils/getNostradamusTeam'

export const nostradamusReaction = (gamestate, title) => {
  /*   const tokens = getAllPlayerTokens(gamestate.players)   */
  const nostradamusTeam = getNostradamusTeam(gamestate.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]

  /*   
tokens.forEach((token) => { gamestate.players[token].action_finished = false
createAndSendSceneMessage(gamestate, token, title, action, narration)}) */

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
