const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions, concatArraysWithUniqueElements, getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//TODO DREAMWOLF & werewolf_response
//? INFO: Werewolves (4) - Open their eyes and view their fellow Werewolves (including Mystic and Alpha)
exports.werewolves = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  newGameState.werewolves = getPlayerNumbersWithMatchingTokens(players, tokens)
  newGameState.dreamwolf = getDreamWolfPlayerNumberByRoleIds(players)
  const loneWolf = (newGameState.werewolves.length + newGameState.dreamwolf.length) === 1

  const selectableCards = loneWolf ? centerCardPositions : []

  tokens.forEach((token) => {
    const player = players[token]

    const playerHistory = {
      ...newGameState.actual_scene,
      werewolves: newGameState.werewolves,
      dreamwolf: newGameState.dreamwolf,
      selectable_cards: selectableCards,
    }
    player.player_history = playerHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: [loneWolf ? "interaction_may_one_center" : "interaction_werewolves"],
        icon: loneWolf ? "spy" : "werewolf",
        werewolves: newGameState.werewolves,
        dreamwolf: newGameState.dreamwolf,
        selectable_cards: selectablePlayersWithNoShield,
        selectable_card_limit: { player: 2, center: 0 },
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.werewolves_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].player_history.selectable_cards.includes(position)) === false) return gameState

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

  player.player_history.show_cards = showCards
  player.card_or_mark_action = true

  

role_interactions.push({
    type: INTERACTION,
    title,
    token,
    informations: {
      message: ["interaction_saw_card", `${selected_positions[0]}`],
      icon: "spy",
      werewolves: newGameState.werewolves,
      dreamwolf: newGameState.dreamwolf,
      viewed_cards: `${selected_positions[0]}`,
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    },
    player: {
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    },
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
