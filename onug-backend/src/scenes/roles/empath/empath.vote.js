import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { empathVoteResult } from './empath.voteresult'

export const empathVote = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'empath_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'empath' && isActivePlayer(card).EMPATH_VOTE) {
      gamestate.players[token].action_finished = false
      interaction = empathVoteResult(gamestate, token, title)
    } else if (prefix === 'doppelganger_empath' && isActivePlayer(card).EMPATH_VOTE) {
      gamestate.players[token].action_finished = false
      interaction = empathVoteResult(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
