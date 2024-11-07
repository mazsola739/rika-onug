import { COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { cupidInteraction } from './cupid.interaction'

export const cupid = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['cupid_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 31 || (card.player_role_id === 31 && COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = cupidInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
