const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getKeys } = require("../utils")

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const werewolfPlayerNumbers = [...newGameState.werewolves, ...newGameState.dreamwolf]

  tokens.forEach((token) => {
    const player = players[token]
    
    const roleHistory = {
      ...newGameState.actual_scene,
      werewolves: werewolfPlayerNumbers,
    }
    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

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
      player_number: player?.player_number,
      ...playerCard,
    })

    //TODO save multiple
    newGameState.actual_scene.interaction = `The player ${player.player_number} saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
