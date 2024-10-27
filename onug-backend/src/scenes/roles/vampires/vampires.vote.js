import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { vampiresVoteResult } from './vampires.voteresult'

export const vampiresVote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['vampires_vote_result_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.ALL_VAMPIRE_IDS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = vampiresVoteResult(newGamestate, token, title)
    }

    newGamestate.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
