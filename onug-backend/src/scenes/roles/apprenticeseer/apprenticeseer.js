import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeseerInteraction } from './apprenticeseer.interaction'

export const apprenticeseer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['apprenticeseer_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).APPRENTICE_SEER) {
      gamestate.players[token].action_finished = false
      interaction = apprenticeseerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
