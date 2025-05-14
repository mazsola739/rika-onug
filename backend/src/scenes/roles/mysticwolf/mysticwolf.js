import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { mysticwolfAction } from './mysticwolf.action'

export const mysticwolf = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['mysticwolf_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).MYSTIC_WOLF) {
      gamestate.players[token].action_finished = false
      action = mysticwolfAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
