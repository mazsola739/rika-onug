import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { paranormalinvestigatorInteraction } from './paranormalinvestigator.interaction'

export const paranormalinvestigator = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['paranormalinvestigator_kickoff_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).PARANORMAL_INVESTIGATOR) {
      gamestate.players[token].action_finished = false
      interaction = paranormalinvestigatorInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
