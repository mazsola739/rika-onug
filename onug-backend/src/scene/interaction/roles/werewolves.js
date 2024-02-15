const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions, concatArraysWithUniqueElements } = require("../utils")
const { centerCardPositions } = require("../constants")

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
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      werewolves: newGameState.werewolves,
      dreamwolf: newGameState.dreamwolf,
      selectable_cards: selectableCards,
    }
    player.role_history = roleHistory
    
    const werewolfPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, werewolfPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, werewolfPlayerNumber)
    const playerCard = player?.card

    if (iSeeMyCardIsFlipped) {
      const positionCard = newGameState.card_positions[werewolfPlayerNumber[0]]
      playerCard.id = positionCard.id
      playerCard.role_id = positionCard.id
      playerCard.role = positionCard.role
      playerCard.team = positionCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }

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
      show_cards: flippedCards,
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })

    if (!loneWolf) {
      newGameState.actual_scene.interaction = `The Werewolves saw werewolf position(s): player ${newGameState.werewolves.join(', ')} and dream wolf position(s): player ${newGameState.dreamwolf.join(', ')}`
    }
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
    playerCard.id = 0
  }

  player.role_history.show_cards = showCards
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "WEREWOLVES",
    token,
    message: "interaction_lonewolf2",
    werewolves: newGameState.werewolves,
    dreamwolf: newGameState.dreamwolf,
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
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
  newGameState.actual_scene.interaction = `The player ${player.player_number} viewed card on the next position: ${selected_positions[0]}`

  return newGameState
}
