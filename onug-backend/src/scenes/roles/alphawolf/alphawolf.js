import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { alphawolfInteraction } from './alphawolf.interaction'

export const alphawolf = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['alphawolf_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALPHA_WOLF) {
      gamestate.players[token].action_finished = false
      interaction = alphawolfInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
