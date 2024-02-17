const { INTERACTION } = require('../../../constant/ws')
const { updatePlayerCard } = require('../update-player-card')
const {
  getPlayerNumbersWithMatchingTokens,
  isActivePlayersCardsFlipped,
  isPlayersCardsFlipped,
  getKeys,
  getMadScientistPlayerNumberByRoleIds,
} = require('../utils')

exports.intern = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      madscientist: madscientistPlayerNumbers,
    }
    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)

    if (madscientistPlayerNumbers.length === 0) {
      playerCard.role_id = 63
      playerCard.role = 'MAD_SCIENTIST'

      newGameState.actual_scene.interaction = `The player ${player.player_number} did not see the Mad Scientist, so they become that role.}`
    } else {
      newGameState.actual_scene.interaction = `The player ${player.player_number} saw Mad Scientist position(s): player ${madscientistPlayerNumbers.join(', ')}`
    }

    role_interactions.push({
      type: INTERACTION,
      title: 'INTERN',
      token,
      message: 'interaction_intern',
      madscientist: madscientistPlayerNumbers,
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
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
