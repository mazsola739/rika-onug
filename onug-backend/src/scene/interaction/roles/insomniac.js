const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  if (!newGameState.players[token].card.shield) {
    const insomniacPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, insomniacPlayerNumbers)

    const roleHistory = {
      ...newGameState.actual_scene,
      show_cards: showCards,
    }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${insomniacPlayerNumbers[0]}`]?.team


    role_interactions.push({
      type: INTERACTION,
      title: "INSOMNIAC",
      token,
      message: "interaction_insomniac",
      show_cards: showCards,
      shielded_players: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed their card`
  } else if (newGameState.players[token].card.shield) {
    role_interactions.push({
      type: INTERACTION,
      title: "INSOMNIAC",
      token,
      message: "interaction_shielded",
      shielded_players: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't view their card`
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}
