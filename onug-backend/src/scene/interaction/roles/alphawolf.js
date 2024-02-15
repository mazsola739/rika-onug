const { INTERACTION } = require("../../../constant/ws")
const { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
exports.alphawolf = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(players)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    const alphawolfPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, alphawolfPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, alphawolfPlayerNumber)
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[alphawolfPlayerNumber[0]]

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
      title: "ALPHA_WOLF",
      token,
      message: "interaction_alphawolf",
      selectable_cards: selectablePlayersWithNoShield,
      selectable_limit: { player: 1, center: 0 },
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

//TODO check for null
exports.alphawolf_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions

  const centerWolf = { ...cardPositions.center_wolf }
  const selectedCard = { ...cardPositions[selected_positions[0]] }
  cardPositions.center_wolf = selectedCard
  cardPositions[selected_positions[0]] = centerWolf

  player.role_history.swapped_cards = [selected_positions[0], "center wolf"]
  player.role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf2",
    swapped_cards: [selected_positions[0], "center wolf"],
    shielded_cards: newGameState.shield,
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
  newGameState.actual_scene.interaction = `The player ${player.player_number} swapped cards between positions: player ${selected_positions[0]} and center wolf`

  return newGameState
}
