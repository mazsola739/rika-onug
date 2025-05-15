import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { jokeAction } from './joke.action'
import { random_joke } from './joke.constants'

export const joke = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]

  tokens.forEach(token => {
    let action = {}
    gamestate.players[token].action_finished = false
    action = jokeAction(gamestate, token, title)

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
