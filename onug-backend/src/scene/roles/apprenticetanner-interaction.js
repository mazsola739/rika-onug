import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { getTannerNumberByRoleIds } from '../utils';

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
export const apprenticetanner_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const tanner = getTannerNumberByRoleIds(newGameState.players)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_tanner'],
        'tanner',
        null,
        null,
        null,
        null,
        tanner
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      tanner
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};
