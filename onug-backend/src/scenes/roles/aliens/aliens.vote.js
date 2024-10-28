import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { aliensVoteResult } from './aliens.voteresult'

export const aliensVote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.ALL_ALIEN_IDS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = aliensVoteResult(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
