const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const {  getMadScientistPlayerNumberByRoleIds } = require('../utils')

exports.intern = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players } = newGameState
    const player = players[token]
    const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(players)

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card

    if (madscientistPlayerNumbers.length === 0) {
      playerCard.player_role_id = 63
      playerCard.player_role = 'MAD_SCIENTIST'
    }

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        [madscientistPlayerNumbers.length === 0 ? "interaction_mad_now" : "interaction_mad"],
        'mad',
        null,
        null,
        null,
        null,
        { madscientist: madscientistPlayerNumbers, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      madscientist: madscientistPlayerNumbers,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}