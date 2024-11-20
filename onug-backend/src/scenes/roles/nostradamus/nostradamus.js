import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { nostradamusInteraction } from './nostradamus.interaction'

export const nostradamus = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['nostradamus_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).NOSTRADAMUS) {
      gamestate.players[token].action_finished = false
      interaction = nostradamusInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
