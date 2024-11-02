import { IDS } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from "../../sceneUtils"
import { alphawolfInteraction } from "./alphawolf.interaction"

export const alphawolf = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['alphawolf_kickoff_text']
  
  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 17 || (card.player_role_id === 17 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = alphawolfInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
