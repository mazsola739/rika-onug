import { ALL_COPY_PLAYER, ALL_SUPER_VILLAIN } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { supervillainsInteraction } from './supervillains.interaction'

export const supervillains = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['supervillains_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (
      ALL_SUPER_VILLAIN.some(
        (id) =>
          card.player_role_id === id &&
          [id, ...ALL_COPY_PLAYER].includes(card.player_original_id)
      )
    ) {
      newGamestate.players[token].action_finished = false
      interaction = supervillainsInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
