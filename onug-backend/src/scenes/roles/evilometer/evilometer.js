import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { evilometerInteraction } from './evilometer.interaction'

//TODO super villains can see evilometer
export const evilometer = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_evilometer_kickoff_text' : 'evilometer_kickoff_text', 'evilometer_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).EVILOMETER) {
      gamestate.players[token].action_finished = false
      interaction = evilometerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
