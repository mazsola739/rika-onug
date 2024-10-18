import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { werewolvesInteraction } from "./werewolves.interaction"

export const werewolves = (gamestate, title, hasDreamWolf) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDreamWolf
      ? 'werewolves_dreamwolf_kickoff_text'
      : 'werewolves_kickoff_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.WEREVOLVES.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = werewolvesInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
