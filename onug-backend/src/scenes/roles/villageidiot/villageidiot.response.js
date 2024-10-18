import { SCENE } from "../../../constants"
import { getPlayerNumberWithMatchingToken, generateRoleInteraction } from "../../sceneUtils"
import { validateAnswerSelection } from "../../validators"
import { moveCardsButYourOwn } from "./villageidiot.utils"

export const villageidiotResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayer = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const updatedPlayerCards = moveCardsButYourOwn(newGamestate.card_positions, selected_answer, currentPlayer)

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.card_positions = {
    ...newGamestate.card_positions,
    ...updatedPlayerCards
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    direction: selected_answer,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
