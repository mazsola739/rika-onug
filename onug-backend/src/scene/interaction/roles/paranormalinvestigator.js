const { INTERACTION } = require("../../../constant/ws")
const { townIds } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys, concatArraysWithUniqueElements, getCardIdsByPositions } = require("../utils")

//? INFO: Paranormal Investigator - Looks at two other player's cards one at a time if he sees team they are not on the Villager Team he stops looking and becomes that role. May not look at any center cards.
exports.paranormalinvestigator = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)

    role_interactions.push({
      type: INTERACTION,
      title: "PARANORMAL_INVESTIGATOR",
      token,
      message: "interaction_paranormalinvestigator",
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 2, center: 0 },
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
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.paranormalinvestigator_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions = newGameState.card_positions

  const selectedCards = getCardIdsByPositions(cardPositions, [selected_positions[0], selected_positions[1]])
  const playerOneCardId = selectedCards[0][selected_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_positions[1]]

  let showCards
  if (townIds.includes(playerOneCardId)) {
    if (townIds.includes(playerTwoCardId)) {
      showCards = selectedCards
      if (playerCard.original_id === playerOneCardId || playerCard.original_id === playerTwoCardId) {
        playerCard.id = 0
      }

      newGameState.actual_scene.interaction = `The player ${player.player_number} saw the cards on the next positions: ${selected_positions[0]}, ${selected_positions[1]}, and both was town member`
    } else if (!townIds.includes(playerTwoCardId)) {

      showCards = selectedCards
      if (playerCard.original_id === playerOneCardId) {
        playerCard.id = 0
      }

      playerCard.role_id = cardPositions[selected_positions[1]].id
      playerCard.role = cardPositions[selected_positions[1]].role
      playerCard.team = cardPositions[selected_positions[1]].team

      newGameState.actual_scene.interaction = `The player ${player.player_number} saw the cards on the next positions: ${selected_positions[0]}, ${selected_positions[1]}, and the second card was a non-town member, so the player became that role`
    }
  } else if (!townIds.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]

    playerCard.role_id = cardPositions[selected_positions[0]].id
    playerCard.role = cardPositions[selected_positions[0]].role
    playerCard.team = cardPositions[selected_positions[0]].team

    newGameState.actual_scene.interaction = `The player ${player.player_number} saw the card on the next position: ${selected_positions[0]}, and the card was a non-town member, so the player became that role`
  }

  role_interactions.push({
    type: INTERACTION,
    title: "PARANORMAL_INVESTIGATOR",
    token,
    message: "interaction_paranormalinvestigator2",
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
