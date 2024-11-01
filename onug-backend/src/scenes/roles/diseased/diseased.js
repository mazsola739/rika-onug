import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { diseasedInteraction } from './diseased.interaction'

export const diseased = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['diseased_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 32 || (card.player_role_id === 32 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = diseasedInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}