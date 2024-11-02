import { IDS } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from "../../sceneUtils"
import { apprenticeseerInteraction } from "./apprenticeseer.interaction"

export const apprenticeseer = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['apprenticeseer_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 18 || (card.player_role_id === 18 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = apprenticeseerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
