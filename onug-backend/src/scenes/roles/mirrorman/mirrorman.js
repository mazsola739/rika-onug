import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { copycatInteraction } from '../copycat/copycat.interaction'

export const mirrorman = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['mirrorman_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 64) {
      newGamestate.players[token].action_finished = false
      interaction = copycatInteraction(newGamestate, token, title)
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
