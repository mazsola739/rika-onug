import { COPY_PLAYER } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { troublemakerInteraction } from './troublemaker.interaction'

//todo why see?
export const troublemaker = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['troublemaker_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 11 || (card.player_role_id === 11 && COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = troublemakerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
