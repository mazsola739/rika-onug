import {
  createAndSendSceneMessage,
  getAllPlayerTokens,
  getRandomItemFromArray,
} from '../../sceneUtils'
import { random_joke } from './joke.constants'

//TODO
export const joke = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]

  tokens.forEach((token) => {
    let interaction = {}

    newGamestate.players[token].action_finished = false
    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
