const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getTokensByRoleIds } = require("../utils")
const { werewolvesAndDreamWolfIds } = require("../constants")

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const werewolfTokens = getTokensByRoleIds(newGameState.players, werewolvesAndDreamWolfIds)
  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, werewolfTokens)

  const roleHistory = {
    ...newGameState.actual_scene,
    werewolves: werewolfPlayerNumbers,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const minionPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, minionPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, minionPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[minionPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[minionPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[minionPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[minionPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "MINION",
    token,
    message: "interaction_minion",
    werewolves: werewolfPlayerNumbers,
    shielded_players: newGameState.shield,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')}`

  newGameState.role_interactions = role_interactions

  return newGameState
}
