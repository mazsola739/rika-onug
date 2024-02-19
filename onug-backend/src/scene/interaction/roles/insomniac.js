const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const { players } = newGameState
    const cardPositions = newGameState.card_positions
    const player = players[token]

    updatePlayerCard(newGameState, token)

    const playerCard = player?.card
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const currentCard = cardPositions[currentPlayerNumber[0]]

    if (!playerCard.shield) {

      playerCard.player_card_id = currentCard.id
      playerCard.player_team = currentCard.team

      const showCards = getCardIdsByPlayerNumbers(cardPositions, currentPlayerNumber)

      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_own'],
          'insomniac',
          null,
          null,
          showCards,
          null,
          null
        )
      )

      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        show_cards: showCards,
      }
      player.player_history = playerHistory
    } else {
      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_shielded'],
          'shield',
          null,
          null,
          null,
          null,
          null
        )
      )
      
      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        shielded: true
      }
      player.player_history = playerHistory
    }
  })

  return { ...newGameState, role_interactions }
}
