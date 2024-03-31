//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getRandomItemsFromArray } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const doppelganger = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['doppelganger_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 1) {
      interaction = doppelganger_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

//TODO shield?
export const doppelganger_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const privateMessage = ['interaction_must_one_any_other']
  const requiredCardSelection = getRandomItemsFromArray(selectablePlayersWithNoShield, 1)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
    required_card_selection: requiredCardSelection, private_message: privateMessage,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'copy',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const doppelganger_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  newGameState.players[token].card.player_role_id = newGameState.card_positions[selected_card_positions[0]].card.id
  newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[0]].card.role
  newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[0]].card.team

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])

    ; (newGameState.players[token].player_history.show_cards = showCards),
      (newGameState.players[token].new_role_id = newGameState.players[token].card.player_role_id)
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_you_are_that_role', `${newGameState.players[token]?.card.player_role}`],
    icon: 'copy',
    showCards: showCards,
    uniqInformations: { new_role_id: newGameState.players[token].card.player_role_id, viewed_cards: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
