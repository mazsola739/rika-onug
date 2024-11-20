import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { sentinelInteraction } from './sentinel.interaction'

export const sentinel = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['sentinel_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SENTINEL) {
      gamestate.players[token].action_finished = false
      interaction = sentinelInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
