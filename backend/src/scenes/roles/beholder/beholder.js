import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { beholderAction } from './beholder.action'

export const beholder = (gamestate, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [
    hasDoppelganger ? 'doppelganger_beholder_kickoff' : 'beholder_seer_kickoff',
    hasSeer && hasApprenticeSeer ? 'beholder_seer_apprenticeseer_kickoff' : hasSeer ? 'beholder_seer_kickoff' : 'beholder_apprenticeseer_kickoff'
  ]

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).BEHOLDER) {
      gamestate.players[token].action_finished = false

      action = beholderAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
