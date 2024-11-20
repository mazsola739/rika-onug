import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { thingInteraction } from './thing.interaction'

export const thing = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['thing_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).THING) {
      gamestate.players[token].action_finished = false
      interaction = thingInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
