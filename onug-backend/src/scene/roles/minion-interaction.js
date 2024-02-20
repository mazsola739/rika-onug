import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
export const minion_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const werewolfPlayerNumbers = [...newGameState.werewolves, ...newGameState.dreamwolf]

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_werewolves'],
        'werewolf',
        null,
        null,
        null,
        null,
         {werewolves: werewolfPlayerNumbers, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      werewolves: werewolfPlayerNumbers,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};
