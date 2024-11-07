import { ALL_COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { internInteraction } from './intern.interaction'

export const intern = (gamestate, title, hasDoppelganger, hasMadScientist) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_intern_kickoff_text' : 'intern_kickoff_text', hasMadScientist ? 'intern_kickoff2_text' : 'intern_kickoff_alone_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 62 || (card.player_role_id === 62 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = internInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
