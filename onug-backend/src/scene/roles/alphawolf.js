import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'
import { getNonWerewolfPlayerNumbersByRoleIds, getSelectablePlayersWithNoShield } from '../utils'

export const alphawolf = (gameState) => {
  
  ["alphawolf_kickoff_text"]

/* if (conditions.hasAlphaWolfPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [17])
  return roles.alphawolf_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
 */
}

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
export const alphawolf_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach(token => {
    const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        gameState = newGameState,
        title = title,
        token = token,
        narration = [""],
        message = ["interaction_one_any_non_werewolf"],
        icon = 'claw',
        selectableCards = { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}

export const alphawolf_response =  (gameState, token, selected_positions, title) => {
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

  const scene_role_interactions = [
    generateSceneRoleInteractions(
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

  return { ...newGameState, scene_role_interactions }
}
