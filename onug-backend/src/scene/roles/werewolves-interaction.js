import {
  getWerewolfPlayerNumbersByRoleIds,
  getDreamWolfPlayerNumberByRoleIds,
  getCardIdsByPositions,
} from '../utils';

import { centerCardPositions } from '../constants';
import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';

//? INFO: Werewolves (4) - Open their eyes and view their fellow Werewolves (including Mystic and Alpha)
export const werewolves_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const werewolves = getWerewolfPlayerNumbersByRoleIds(newGameState.players, tokens)
    const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGameState.players)
    const loneWolf = (werewolves.length + dreamwolf.length) === 1

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        [loneWolf ? "interaction_may_one_center" : "interaction_werewolves"],
        loneWolf ? "spy" : "werewolf",
        { selectable_cards: loneWolf ? centerCardPositions : [], selectable_card_limit: { player: 0, center: 1 } },
        null,
        null,
        null,
        { werewolves, dreamwolf }
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 },
      werewolves, dreamwolf,
    }

    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};

export const werewolves_response_interaction =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]

  if (newGameState.players[token].card.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_saw_card", selected_positions[0]],
      'spy',
      null,
      null,
      showCards,
      null,
      { viewed_cards: selected_positions[0], werewolves: newGameState.werewolves, dreamwolf: newGameState.dreamwolf }
    )
  ]

  newGameState.players[token].player_history.show_cards = showCards
  newGameState.players[token].card_or_mark_action = true

  return { ...newGameState, role_interactions }
};
