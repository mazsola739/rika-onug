import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { insomniacInteraction } from './insomniac.interaction'

export const insomniac = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_insomniac_kickoff_text' : 'insomniac_kickoff_text', 'insomniac_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 4 || (card.player_role_id === 4 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = insomniacInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
