import { IDS } from "../../../constants"
import { getAllPlayerTokens, createAndSendSceneMessage } from "../../sceneUtils"
import { thingInteraction } from "../thing/thing.interaction"

export const annoyinglad = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['annoyinglad_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 55 || (card.player_role_id === 55 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = thingInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
