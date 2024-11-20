import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { aliensVoteResult } from './aliens.voteresult'

export const aliensVote = (gamestate, title) => {
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(gamestate.players)

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALIENS) {
      gamestate.players[token].action_finished = false
      interaction = aliensVoteResult(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
