import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { renfieldInteraction } from './renfield.interaction'

//TODO no vampire he is villager
export const renfield = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_renfield_kickoff_text' : 'renfield_kickoff_text', 'renfield_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 38 || (card.player_role_id === 38 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = renfieldInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
