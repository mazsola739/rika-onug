const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions } = require("../utils")
const { centerCardPositions } = require("../constants")

//TODO DREAMWOLF & werewolf_response
//? INFO: Werewolves (4) - Open their eyes and view their fellow Werewolves (including Mystic and Alpha)
exports.werewolves = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)
  const dreamWolfPlayerNumber = getDreamWolfPlayerNumberByRoleIds(newGameState.players)
  const loneWolf = werewolfPlayerNumbers.length + dreamWolfPlayerNumber.length === 1

  const selectableCards = loneWolf ? centerCardPositions : []

  tokens.forEach((token) => {
    const roleHistory = { ...newGameState.actual_scene, selectable_cards: selectableCards }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card_or_mark_action = false

    role_interactions.push({
      type: INTERACTION,
      title: "WEREWOLVES",
      token,
      message: loneWolf ? "interaction_lonewolf" : "interaction_werewolves",
      werewolves: werewolfPlayerNumbers,
      selectable_cards: selectableCards,
      shielded_players: newGameState.shield,
    })

    if (!loneWolf) {
      newGameState.actual_scene.interaction = `The Werewolves saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')} and dream wolf position(s): player ${dreamWolfPlayerNumber.join(', ')}`
    }
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.werewolves_response = (gameState, token, selected_positions) => {
  if (selected_positions.some(position => !gameState.players[token].role_history.selectable_cards.includes(position))) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "WEREWOLVES",
    token,
    message: "interaction_werewolves2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed card on the next position: ${selected_positions[0]}`

  return newGameState
}
