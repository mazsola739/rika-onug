import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { getMadScientistPlayerNumberByRoleIds } from '../utils';

export const intern_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(newGameState.players)

    updatePlayerCard(newGameState, token)
    const playerCard = newGameState.players[token]?.card

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
};