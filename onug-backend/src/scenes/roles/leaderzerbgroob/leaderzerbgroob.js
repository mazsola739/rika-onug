import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { leaderZerbgroobInteraction } from './leaderzerbgroob.interaction'

export const leaderzerbgroob = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['leader_zerbgroob_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).LEADER_ZERB_GROOB) {
      gamestate.players[token].action_finished = false
      interaction = leaderZerbgroobInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
