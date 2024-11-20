import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { doppelgangerInteraction } from './doppelganger.interaction'

//TODO if oracle is oracle team
export const doppelganger = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['doppelganger_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGÄNGER) {
      gamestate.players[token].action_finished = false
      interaction = doppelgangerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
