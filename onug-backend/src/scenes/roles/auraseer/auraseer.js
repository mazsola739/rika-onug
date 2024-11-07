import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { auraseerInteraction } from './auraseer.interaction'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_auraseer_kickoff_text' : 'auraseer_kickoff_text', hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 72 || (card.player_role_id === 72 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = auraseerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
