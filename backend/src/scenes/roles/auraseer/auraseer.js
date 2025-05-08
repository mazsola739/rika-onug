import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { auraseerAction } from './auraseer.action'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_auraseer_kickoff_text' : 'auraseer_kickoff_text', hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).AURA_SEER) {
      gamestate.players[token].action_finished = false

      action = auraseerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
