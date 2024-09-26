import { getPlayerNumberWithMatchingToken } from "../utils"

export const generateWiningLosing = (gameState, token) => {
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gameState.players, token)
  const selectedCards = gameState.selected_cards

}