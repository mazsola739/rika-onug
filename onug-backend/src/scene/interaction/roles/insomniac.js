const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getCardIdsByPlayerNumbers, concatArraysWithUniqueElements , getKeys } = require("../utils")

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = (gameState, tokens, role_id, title) => {
  const roleMapping = {
    4: {
      title,
      message: 'interaction_insomniac'
    },
    67: {
      title,
      message: 'interaction_selfawarenessgirl'
    }
  }

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    updatePlayerCard(newGameState, token)

    if (!playerCard.shield) {
      const showCards = getCardIdsByPlayerNumbers(cardPositions, currentPlayerNumber)
      playerCard.id = currentCard.id
      playerCard.team = currentCard.team

      const roleHistory = {
        ...newGameState.actual_scene,
        show_cards: showCards,
      }
      player.role_history = roleHistory

      role_interactions.push({
        type: INTERACTION,
        title: roleMapping[role_id].title,
        token,
        message: roleMapping[role_id].message,
        selectable_card_limit: { player: 0, center: 0 },
        shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
        show_cards: concatArraysWithUniqueElements(showCards, flippedCards),
        player_name: player?.name,
        player_original_id: playerCard?.original_id,
        player_card_id: playerCard?.id,
        player_role: playerCard?.role,
        player_role_id: playerCard?.role_id,
        player_team: playerCard?.team,
        player_number: player?.player_number,
      })

      newGameState.actual_scene.interaction = `The player ${player.player_number} viewed their card`
    } else {
      role_interactions.push({
        type: INTERACTION,
        title: roleMapping[role_id].title,
        token,
        message: "interaction_shielded",
        selectable_card_limit: { player: 0, center: 0 },
        shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
        player_name: player?.name,
        player_original_id: playerCard?.original_id,
        player_card_id: playerCard?.id,
        player_role: playerCard?.role,
        player_role_id: playerCard?.role_id,
        player_team: playerCard?.team,
        player_number: player?.player_number,
      })

      newGameState.actual_scene.interaction = `The player ${player.player_number} cannot swap cards due to having a shield.`
    }
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
