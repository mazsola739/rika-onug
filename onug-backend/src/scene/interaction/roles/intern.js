const { INTERACTION } = require('../../../constant/ws')
const { updatePlayerCard } = require('../update-player-card')
const { getKeys, getMadScientistPlayerNumberByRoleIds } = require('../utils')

exports.intern = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]

    const playerHistory = {
      ...newGameState.actual_scene,
      madscientist: madscientistPlayerNumbers,
    }
    player.player_history = playerHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    if (madscientistPlayerNumbers.length === 0) {
      playerCard.player_role_id = 63
      playerCard.player_role = 'MAD_SCIENTIST'
    }

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: [madscientistPlayerNumbers.length === 0 ? "interaction_mad_now" : "interaction_mad"],
      madscientist: madscientistPlayerNumbers,
      selectable_card_limit: { player: 0, center: 0 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
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
