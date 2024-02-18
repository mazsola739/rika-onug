const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getKeys } = require("../utils")

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const werewolfPlayerNumbers = [...newGameState.werewolves, ...newGameState.dreamwolf]

  tokens.forEach((token) => {
    const player = players[token]
    
    const playerHistory = {
      ...newGameState.actual_scene,
      werewolves: werewolfPlayerNumbers,
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
        message: ['interaction_werewolves'],
        icon: 'werewolf',
        werewolves: werewolfPlayerNumbers,
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
