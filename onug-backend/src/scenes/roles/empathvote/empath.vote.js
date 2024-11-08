import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { empathVoteResult } from './empath.voteresult'

export const empathVote = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'empath_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'empath' && isActivePlayer(card).EMPATH_VOTE) {
        newGamestate.players[token].action_finished = false
        interaction = empathVoteResult(newGamestate, token, title)
      
    } else if (prefix === 'doppelganger_empath' && isActivePlayer(card).EMPATH_VOTE) {
        newGamestate.players[token].action_finished = false
        interaction = empathVoteResult(newGamestate, token, title)
      }
    

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
