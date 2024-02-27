//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPositions,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const seer = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['seer_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 9 || (newGameState.players[token].card.player_role_id === 9 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 9 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = seer_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const seer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 2 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_may_one_any_other',
      'conjunction_or',
      'interaction_seer_end',
    ],
    icon: 'seer',
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 2 },
    },
  })
}

export const seer_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []
  let showCards = []

  const playerCards = selected_card_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_card_positions.some((pos) => pos.includes('center'))
  const playerHistory =
    newGameState.players[token].player_history.selectable_cards

  if (
    playerCards &&
    !centerCards &&
    playerHistory.includes(selected_card_positions[0])
  ) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, [
      selected_card_positions[0],
    ])
  } else if (
    centerCards &&
    !playerCards &&
    selected_card_positions.every((position) => playerHistory.includes(position))
  ) {
    showCards = getCardIdsByPositions(
      newGameState?.card_positions,
      selected_card_positions
    )
  } else {
    return newGameState
  }

  if (
    showCards.some(
      (card) => newGameState.players[token].card.player_original_id === card.id
    )
  ) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_saw_card',
      selected_card_positions[0],
      showCards.length > 1 ? selected_card_positions[1] : '',
    ],
    icon: 'seer',
    uniqInformations: { viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
