import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { witchInteraction } from './witch.interaction'

export const witch = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['witch_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).WITCH) {
      gamestate.players[token].action_finished = false
      interaction = witchInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
