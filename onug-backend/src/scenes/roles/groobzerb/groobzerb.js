import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { groobzerbInteraction } from './groobzerb.interaction'

export const groobzerb = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_groobzerb_kickoff_text'
      : 'groobzerb_kickoff_text',
    'groobzerb_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.GROOB_AND_ZERB_IDS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = groobzerbInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
