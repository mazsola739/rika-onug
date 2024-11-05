import { COPY_PLAYER } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { sentinelInteraction } from './sentinel.interaction'

export const sentinel = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['sentinel_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 25 || (card.player_role_id === 25 && COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = sentinelInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
