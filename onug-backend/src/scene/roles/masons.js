export const masons_narration = () => ["masons_kickoff_text"];

import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { getPlayerNumbersWithMatchingTokens } from '../utils';

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
export const masons_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const masons = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_masons'],
        'mason',
        null,
        null,
        null,
        null,
        { masons, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      masons,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};
