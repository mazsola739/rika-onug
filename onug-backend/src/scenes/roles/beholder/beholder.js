import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { beholderInteraction } from './beholder.interaction'

export const beholder = (gamestate, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [
    hasDoppelganger ? 'doppelganger_beholder_kickoff_text' : 'beholder_seer_kickoff_text',
    hasSeer && hasApprenticeSeer ? 'beholder_seer_apprenticeseer_kickoff_text' : hasSeer ? 'beholder_seer_kickoff_text' : 'beholder_apprenticeseer_kickoff_text'
  ]

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).BEHOLDER) {
      gamestate.players[token].action_finished = false
      interaction = beholderInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
