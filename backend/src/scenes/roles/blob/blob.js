import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { blobAction } from './blob.action'
import { blobNarration } from './blob.narration'

export const blob = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = blobNarration(gamestate)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).BLOB) {
      gamestate.players[token].action_finished = false
      action = blobAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
