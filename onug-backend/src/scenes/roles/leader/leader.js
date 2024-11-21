import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { leaderAction } from './leader.action'

export const leader = (gamestate, title, hasDoppelganger) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [hasDoppelganger ? 'doppelganger_leader_kickoff_text' : 'leader_kickoff_text', 'leader_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).LEADER) {
      gamestate.players[token].action_finished = false
      action = leaderAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
