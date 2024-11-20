import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { troublemakerInteraction } from './troublemaker.interaction'

export const troublemaker = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['troublemaker_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).TROUBLEMAKER) {
      gamestate.players[token].action_finished = false
      interaction = troublemakerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
