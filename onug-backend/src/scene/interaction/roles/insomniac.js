const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getCardIdsByPlayerNumbers, concatArraysWithUniqueElements, getKeys, getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const cardPositions = newGameState.card_positions

  tokens.forEach((token) => {
    const player = players[token]

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const currentCard = cardPositions[currentPlayerNumber[0]]

    if (!playerCard.shield) {
      playerCard.player_card_id = currentCard.id
      playerCard.player_team = currentCard.team
      
      const showCards = getCardIdsByPlayerNumbers(cardPositions, currentPlayerNumber)

      const roleHistory = {
        ...newGameState.actual_scene,
        show_cards: showCards,
      }
      player.role_history = roleHistory

      role_interactions.push({
        type: INTERACTION,
        title,
        token,
        message: ["interaction_own"],
        selectable_card_limit: { player: 0, center: 0 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: concatArraysWithUniqueElements(showCards, flippedCards),
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      })
    } else {
      role_interactions.push({
        type: INTERACTION,
        title,
        token,
        message: ["interaction_shielded"],
        selectable_card_limit: { player: 0, center: 0 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      })
    }
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
