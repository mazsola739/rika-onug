import { IDS } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { empathVoteResult } from './empath.voteresult'

export const empathVote = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const narration =  [`${prefix}_kickoff_text`, 'empath_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'empath') {
      if (card.player_original_id === 77 || (card.player_role_id === 77 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = empathVoteResult(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_empath') {
      if (card.player_role_id === 77 && card.player_original_id === 1) {
        interaction = empathVoteResult(newGamestate, token, title)
      }
    }

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
