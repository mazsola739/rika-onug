import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { random_madscientist_intro, random_madscientist_result, random_madscientist_therefore, random_madscientist_transition } from './madscientist.constants'

export const madscientist = (ws, gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [
    'madscientist_kickoff_text',
    getRandomItemFromArray(random_madscientist_intro),
    getRandomItemFromArray(random_madscientist_therefore),
    getRandomItemFromArray(random_madscientist_result),
    getRandomItemFromArray(random_madscientist_transition),
    'madscientist_close_text'
  ]

  tokens.forEach(token => {
    let action = {}

    gamestate.players[token].action_finished = false
    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
