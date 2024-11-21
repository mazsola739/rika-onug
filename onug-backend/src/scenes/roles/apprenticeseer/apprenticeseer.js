import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeseerInteraction } from './apprenticeseer.action'

export const apprenticeseer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['apprenticeseer_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).APPRENTICE_SEER) {
      gamestate.players[token].action_finished = false
      action = apprenticeseerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
