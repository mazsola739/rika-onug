import { insomniacInteraction } from '..'
import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const selfawarenessgirl = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_selfawarenessgirl_kickoff_text'
      : 'selfawarenessgirl_kickoff_text',
    'selfawarenessgirl_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (
      card.player_original_id === 67 ||
      (card.player_role_id === 67 &&
        ALL_COPY_PLAYER.includes(card.player_original_id))
    ) {
      newGamestate.players[token].action_finished = false
      interaction = insomniacInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
