import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { internInteraction } from './intern.interaction'

export const intern = (gamestate, title, hasDoppelganger, hasMadScientist) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_intern_kickoff_text' : 'intern_kickoff_text', hasMadScientist ? 'intern_kickoff2_text' : 'intern_kickoff_alone_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).INTERN) {
      gamestate.players[token].action_finished = false
      interaction = internInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
