import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { paranormalinvestigatorInteraction } from './paranormalinvestigator.interaction'

export const paranormalinvestigator = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['paranormalinvestigator_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 23 || (card.player_role_id === 23 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = paranormalinvestigatorInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
