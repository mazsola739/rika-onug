import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { auraseerInteraction } from './auraseer.interaction'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_auraseer_kickoff_text' : 'auraseer_kickoff_text', hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).AURA_SEER) {
      gamestate.players[token].action_finished = false
      interaction = auraseerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
