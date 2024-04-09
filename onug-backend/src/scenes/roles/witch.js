//@ts-check
import { copyPlayerIds, SCENE, centerCardPositions } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, formatPlayerIdentifier, getPlayerNumberWithMatchingToken } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const witch = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['witch_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 27 || (card.player_role_id === 27 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = witch_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const witch_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_center'],
    icon: title === 'WITCH' ? 'witch' : 'voodoo',
    selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
  })
} 

export const witch_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
    const selectedCenterCardPosition = newGameState.card_positions[selected_card_positions[0]].card

    if (newGameState.players[token].card.player_original_id === selectedCenterCardPosition.id) {
      newGameState.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
      viewed_cards: [selected_card_positions[0]],
      selected_center_card: selected_card_positions[0],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
      icon: title === 'WITCH' ? 'witch' : 'voodoo',
      selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 1, center: 0 } },
      showCards,
      uniqueInformations: { witch: title === 'WITCH' ? [selected_card_positions[0]] : [], voodoo: title === 'VOODOO' ? [selected_card_positions[0]] : [], },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState

  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard = newGameState.card_positions[newGameState.players[token].player_history.selected_center_card].card
    const selectedPlayerPositionCard = newGameState.card_positions[selected_card_positions[0]].card

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGameState.card_positions[newGameState.players[token].player_history.selected_center_card].card = selectedPlayerCard
    newGameState.card_positions[selected_card_positions[0]].card = selectedCenterCard

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

    if (selected_card_positions[0] === currentPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[currentPlayerNumber[0]].card
      newGameState.players[token].card.player_card_id = currentCard.id
      newGameState.players[token].card.player_team = currentCard.team
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      swapped_cards: [newGameState.players[token].player_history.selected_center_card, selected_card_positions[0]],
    }

    const messageIdentifiers = formatPlayerIdentifier([`${newGameState.players[token].player_history.selected_center_card}`, selected_card_positions[0]])

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: title === 'WITCH' ? 'witch' : 'voodoo',
      uniqueInformations: { witch: title === 'WITCH' ? [newGameState.players[token].player_history.selected_center_card, selected_card_positions[0]] : [], voodoo: title === 'VOODOO' ? [newGameState.players[token].player_history.selected_center_card, selected_card_positions[0]] : [], },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState
  }
}


