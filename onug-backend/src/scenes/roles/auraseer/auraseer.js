import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { auraseerInteraction } from './auraseer.interaction'

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_auraseer_kickoff_text'
      : 'auraseer_kickoff_text',
    hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 72 || (card.player_role_id === 72 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = auraseerInteraction(newGamestate, token, title)
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
