import { updatePlayerCard } from '../update-player-card';
import { generateRoleInteractions } from '../generate-role-interactions';
import { isValidSelection } from '../validate-response-data';
import { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield } from '../utils';

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
export const alphawolf_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
  
    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_one_any_non_werewolf"],
        'claw',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
};

export const alphawolf_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const centerWolf = { ...newGameState.card_positions.center_wolf }
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] }
  newGameState.card_positions.center_wolf = selectedCard
  newGameState.card_positions[selected_positions[0]] = centerWolf

  newGameState.players[token].card_or_mark_action = true
  newGameState.players[token].player_history.swapped_cards = [selected_positions[0], "center_wolf"]

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", selected_positions[0], "center_wolf"],
      'claw',
      null,
      null,
      null,
      null,
      { swapped_cards: [selected_positions[0], 'center_wolf'] }
    )
  ]

  return { ...newGameState, role_interactions }
};

