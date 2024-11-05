import { ALL_ALIEN, ALL_COPY_PLAYER } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from "../../sceneUtils"
import { aliensVoteResult } from "./aliens.voteresult"

export const aliensVote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  
  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_ALIEN.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER].includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = aliensVoteResult(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
