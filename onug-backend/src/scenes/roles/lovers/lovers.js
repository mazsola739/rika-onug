import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { loversInteraction } from './lovers.interaction'

export const lovers = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['lovers_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGamestate.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = loversInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
