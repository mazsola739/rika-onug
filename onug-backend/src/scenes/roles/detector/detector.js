import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { seerInteraction } from '../seer/seer.action'

export const detector = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['detector_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DETECTOR) {
      gamestate.players[token].action_finished = false
      action = seerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
