const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions, concatArraysWithUniqueElements, getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//TODO DREAMWOLF & werewolf_response
//? INFO: Werewolves (4) - Open their eyes and view their fellow Werewolves (including Mystic and Alpha)
exports.werewolves = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  newGameState.werewolves = getPlayerNumbersWithMatchingTokens(players, tokens)
  newGameState.dreamwolf = getDreamWolfPlayerNumberByRoleIds(players)
  const loneWolf = (newGameState.werewolves.length + newGameState.dreamwolf.length) === 1

  const selectableCards = loneWolf ? centerCardPositions : []

  tokens.forEach((token) => {
    const player = players[token]

    const roleHistory = {
      ...newGameState.actual_scene,
      werewolves: newGameState.werewolves,
      dreamwolf: newGameState.dreamwolf,
      selectable_cards: selectableCards,
    }
    player.role_history = roleHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title: "WEREWOLVES",
      token,
      message: loneWolf ? "interaction_lonewolf" : "interaction_werewolves",
      werewolves: newGameState.werewolves,
      dreamwolf: newGameState.dreamwolf,
      selectable_cards: selectableCards,
      selectable_card_limit: { player: 0, center: 1 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.werewolves_response = (gameState, token, selected_positions) => {
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
    playerCard.player_card_id = 0
  }

  player.role_history.show_cards = showCards
  player.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "WEREWOLVES",
    token,
    message: "interaction_lonewolf2",
    werewolves: newGameState.werewolves,
    dreamwolf: newGameState.dreamwolf,
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
