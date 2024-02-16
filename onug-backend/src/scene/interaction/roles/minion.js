const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys } = require("../utils")

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const werewolfPlayerNumbers = [...newGameState.werewolves, ...newGameState.dreamwolf]

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      werewolves: werewolfPlayerNumbers,
    }
    player.role_history = roleHistory

    const minionPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, minionPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, minionPlayerNumber)
    const playerCard = player?.card

    if (iSeeMyCardIsFlipped) {
      const positionCard = newGameState.card_positions[minionPlayerNumber[0]]
      playerCard.id = positionCard.id
      playerCard.role_id = positionCard.id
      playerCard.role = positionCard.role
      playerCard.team = positionCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.id = 0
    }

    role_interactions.push({
      type: INTERACTION,
      title: "MINION",
      token,
      message: "interaction_minion",
      werewolves: werewolfPlayerNumbers,
      selectable_card_limit: { player: 0, center: 0 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })

    //TODO save multiple
    newGameState.actual_scene.interaction = `The player ${player.player_number} saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
