import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { internAction } from './intern.action'

export const intern = (gamestate, title, hasDoppelganger, hasMadScientist) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_intern_kickoff' : 'intern_kickoff', hasMadScientist ? 'intern_kickoff2' : 'intern_kickoff_alone']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).INTERN) {
      gamestate.players[token].action_finished = false
      action = internAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
