import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { auraseerInteraction } from './auraseer.interaction'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_auraseer_kickoff_text' : 'auraseer_kickoff_text', hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (isActivePlayer(card).AURA_SEER) {
      newGamestate.players[token].action_finished = false
      interaction = auraseerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
