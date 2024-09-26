import { CENTER_CARD_POSITIONS, COPY_PLAYER_IDS, SCENE } from '../../constant'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const seer = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['seer_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 9 || (card.player_role_id === 9 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = seer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const seer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGameState.players, token)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS], selectable_card_limit: { player: 1, center: 2 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other', 'conjunction_or', 'interaction_seer_end'],
    icon: 'seer',
    selectableCards: { selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS], selectable_card_limit: { player: 1, center: 2 } },
  })
}

export const seer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
 
  const newGameState = { ...gameState }
  const scene = []

  let showCards = []

  const playerCards = selected_card_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_card_positions.some((pos) => pos.includes('center'))
  const playerHistory = newGameState.players[token].player_history[title].selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_card_positions[0])) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, [selected_card_positions[0]])
  } else if (centerCards && !playerCards && selected_card_positions.every((position) => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, selected_card_positions.slice(0, 2))
  } else {
    return newGameState
  }

  if (showCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  const viewedCards = showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    viewed_cards: showCards,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: title === 'SEER' ? 'seer' : 'detector',
    showCards,
    uniqueInformations: { seer: title === 'SEER' ? viewedCards : [], detector: title === 'DETECTOR' ? viewedCards : []},
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
