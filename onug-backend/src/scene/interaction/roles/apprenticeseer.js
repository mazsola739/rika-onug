const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions } = require("../utils")
const { centerCardPositions } = require("../constants")

//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      shielded_cards: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  
   // newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw Mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })
  
    newGameState.role_interactions = role_interactions

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: centerCardPositions,
  }

  newGameState.players[token].role_history = roleHistory
  
  const apprenticeseerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, apprenticeseerPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, apprenticeseerPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[apprenticeseerPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[apprenticeseerPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[apprenticeseerPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[apprenticeseerPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer",
    selectable_cards: centerCardPositions,
    selectable_limit: { player: 0, center: 1 },
    shielded_cards: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.apprenticeseer_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer2",
    show_cards: showCards,
    shielded_cards: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed a card in the next position: ${selected_positions[0]}`

  return newGameState
}
