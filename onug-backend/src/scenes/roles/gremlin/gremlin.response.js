import { SCENE } from "../../../constants"
import { getPlayerNumberWithMatchingToken, formatPlayerIdentifier, generateRoleInteraction } from "../../sceneUtils"
import { validateCardSelection, validateMarkSelection } from "../../validators"

export const gremlinResponse = (gamestate, token, selected_card_positions, selected_mark_positions, title) => {
    if (selected_card_positions && selected_card_positions.length > 0) {
      if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
        return gamestate
      }
  
      const newGamestate = { ...gamestate }
      const scene = []
  
      const [position1, position2] = selected_card_positions
      const playerOneCard = { ...newGamestate.card_positions[position1].card }
      const playerTwoCard = { ...newGamestate.card_positions[position2].card }
  
      newGamestate.card_positions[position1].card = playerTwoCard
      newGamestate.card_positions[position2].card = playerOneCard
  
      newGamestate.players[token].card_or_mark_action = true
  
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  
      if (currentPlayerNumber === selected_card_positions[0] || currentPlayerNumber === selected_card_positions[1]) {
        newGamestate.players[token].card.player_card_id = 0
      }
  
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [position1, position2],
      }
  
      const messageIdentifiers = formatPlayerIdentifier([position1, position2])
  
      const interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIdentifiers],
        uniqueInformations: { gremlin: [position1, position2] },
      })
  
      scene.push({ type: SCENE, title, token, interaction })
      newGamestate.scene = scene
  
      return newGamestate
  
    } else if (selected_mark_positions && selected_mark_positions.length > 0) {
      if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
        return gamestate
      }
  
      const newGamestate = { ...gamestate }
      const scene = []
  
      const [position1, position2] = selected_mark_positions
      const playerOneMark = { ...newGamestate.card_positions[position1].mark }
      const playerTwoMark = { ...newGamestate.card_positions[position2].mark }
  
      newGamestate.card_positions[position1].mark = playerTwoMark
      newGamestate.card_positions[position2].mark = playerOneMark
  
      newGamestate.players[token].card_or_mark_action = true
  
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  
      if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
        newGamestate.players[token].card.player_mark = ''
      }
  
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]],
      }
  
      const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])
  
      const interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_marks', ...messageIdentifiers],
        uniqueInformations: { gremlin: [selected_mark_positions[0], selected_mark_positions[1]] },
      })
  
      scene.push({ type: SCENE, title, token, interaction })
      newGamestate.scene = scene
  
      return newGamestate
    }
  }
  