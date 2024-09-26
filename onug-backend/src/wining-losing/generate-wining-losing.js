import { getPlayerNumberWithMatchingToken } from "../utils"

export const generateWiningLosing = (gamestate, token) => {
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const selectedCards = gamestate.selected_cards

}