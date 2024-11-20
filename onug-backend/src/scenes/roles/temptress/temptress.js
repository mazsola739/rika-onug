import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { temptressInteraction } from './temptress.interaction'

export const temptress = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['temptress_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).TEMPTRESS) {
      gamestate.players[token].action_finished = false
      interaction = temptressInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
