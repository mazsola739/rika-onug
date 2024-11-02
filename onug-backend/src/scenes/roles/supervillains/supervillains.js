import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { supervillainsInteraction } from './supervillains.interaction'

export const supervillains = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['supervillains_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.ALL_SUPER_VILLAIN_IDS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = supervillainsInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
