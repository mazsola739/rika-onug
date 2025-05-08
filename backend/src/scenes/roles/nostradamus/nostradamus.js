import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { nostradamusAction } from './nostradamus.action'

export const nostradamus = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['nostradamus_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).NOSTRADAMUS) {
      gamestate.players[token].action_finished = false

      action = nostradamusAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
