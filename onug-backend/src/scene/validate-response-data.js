//@ts-check
export const isValidSelection = (selected_positions, player_history) => {
    if (selected_positions.length === 0 || !selected_positions.every(position => player_history.selectable_cards.includes(position))) {
      return false
    }
  
    const hasPlayerPositions = selected_positions.some(position => position.startsWith("player_"))
    const hasCenterPositions = selected_positions.some(position => position.startsWith("center_"))

    if (hasPlayerPositions && hasCenterPositions || selected_positions.length !== player_history.selectable_card_limit[hasPlayerPositions ? "player" : "center"]) {
      return false
    }
  
    return true
  }
  
  