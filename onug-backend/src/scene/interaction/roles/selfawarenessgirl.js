const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: SELF_AWARENESS_GIRL – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.selfawarenessgirl = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []


  /* const selfawarenessgirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, selfawarenessgirlPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, selfawarenessgirlPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  } */

  if (!newGameState.players[token].card.shield) {
    const selfAwarenessGirlPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, selfAwarenessGirlPlayerNumbers)

    const roleHistory = {
      ...newGameState.actual_scene,
      show_cards: showCards,
    }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${selfAwarenessGirlPlayerNumbers[0]}`]?.team
    newGameState.players[token].card_or_mark_action = false

    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_insomniac",
      show_cards: showCards,
      shielded_players: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed their card`
  } else {
    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_shielded",
      shielded_players: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't view their card`
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}
