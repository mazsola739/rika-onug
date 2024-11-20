import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { seerInteraction } from '../seer/seer.interaction'

export const detector = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['detector_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DETECTOR) {
      gamestate.players[token].action_finished = false
      interaction = seerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
