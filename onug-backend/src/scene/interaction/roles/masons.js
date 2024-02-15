const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const masons = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
      masons,
    }

    newGameState.players[token].role_history = roleHistory
    
    const masonPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, masonPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, masonPlayerNumber)

    if (iSeeMyCardIsFlipped) {
      newGameState.players[token].card.id = newGameState.card_positions[masonPlayerNumber[0]].id
      newGameState.players[token].card.role_id = newGameState.card_positions[masonPlayerNumber[0]].id
      newGameState.players[token].card.role = newGameState.card_positions[masonPlayerNumber[0]].role
      newGameState.players[token].card.team = newGameState.card_positions[masonPlayerNumber[0]].team
    } else if (iSeeMyCardElsewhere) {
      newGameState.players[token].card.id = 0
    }

    role_interactions.push({
      type: INTERACTION,
      title: "MASONS",
      token,
      message: "interaction_masons",
      selectable_limit: { player: 0, center: 0 },
      masons,
      shielded_cards: newGameState.shield,
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw Mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
