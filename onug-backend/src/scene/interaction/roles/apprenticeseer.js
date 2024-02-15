const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, concatArraysWithUniqueElements } = require("../utils")
const { centerCardPositions } = require("../constants")

//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions,
    }
    player.role_history = roleHistory

    const apprenticeseerPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, apprenticeseerPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, apprenticeseerPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[apprenticeseerPlayerNumber[0]]

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
      title: "APPRENTICE_SEER",
      token,
      message: "interaction_apprenticeseer",
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
      shielded_cards: newGameState.shield,
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

exports.apprenticeseer_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions
  const showCards = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const selectedPositionCard = cardPositions[selected_positions[0]]

  if (playerCard.original_id === selectedPositionCard.id) {
    playerCard.id = 0
  }

  player.role_history.show_cards = showCards
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer2",
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    viewed_cards: [selected_positions[0]],
    shielded_cards: newGameState.shield,
    player_name: player?.name,
    player_original_id: playerCard?.original_id,
    player_card_id: playerCard?.id,
    player_role: playerCard?.role,
    player_role_id: playerCard?.role_id,
    player_team: playerCard?.team,
    player_number: player?.player_number,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${player.player_number} viewed a card in the next position: ${selected_positions[0]}`

  return newGameState
}
