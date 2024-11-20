import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { random_joke } from './joke.constants'

//TODO
export const joke = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]

  tokens.forEach(token => {
    let interaction = {}

    gamestate.players[token].action_finished = false
    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
