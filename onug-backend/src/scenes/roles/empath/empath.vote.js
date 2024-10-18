import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { empathVoteResult } from "./empath.voteresult"

export const empathVote = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const narration =  [`${prefix}_kickoff_text`, 'empath_kickoff2_text']
  const actionTime = 5

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

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
