const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys } = require("../utils")

//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
exports.troublemaker = (gameState, tokens, role_id, title) => {
  const roleMapping = {
    11: {
      title,
      message: 'interaction_troublemaker'
    },
    68: {
      title,
      message: 'interaction_switcheroo'
    }
  }

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
   
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory
      
    
    const troublemakerPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, troublemakerPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, troublemakerPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[troublemakerPlayerNumber[0]]
  
    if (iSeeMyCardIsFlipped) {
      playerCard.id = currentCard.id
      playerCard.role_id = currentCard.id
      playerCard.role = currentCard.role
      playerCard.team = currentCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }
  
    role_interactions.push({
      type: INTERACTION,
      title: roleMapping[role_id].title,
      token,
      message: roleMapping[role_id].message,
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

  return newGameState;
};

exports.troublemaker_response = (gameState, token, selected_positions, role_id, title) => {
  const roleMapping = {
    11: {
      title,
      message: 'interaction_troublemaker2'
    },
    68: {
      title,
      message: 'interaction_switcheroo2'
    }
  }

  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const playerOneCard = { ...cardPositions[selected_positions[0]] };
  const playerTwoCard = { ...cardPositions[selected_positions[1]] };
  cardPositions[selected_positions[0]] = playerTwoCard;
  cardPositions[selected_positions[1]] = playerOneCard;

  player.role_history.swapped_cards = selected_positions.slice(0, 2)
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: roleMapping[role_id].title,
    token,
    message: roleMapping[role_id].message,
    swapped_cards: selected_positions.slice(0, 2),
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    show_cards: newGameState.flipped,
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${player.player_number} swapped cards between: ${selected_positions[0]} and ${selected_positions[1]}`

  return newGameState
};