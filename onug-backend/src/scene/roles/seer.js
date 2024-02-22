//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPositions,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

export const seer = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['seer_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 9) {
      interaction = seer_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const seer_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 2 },
  }

  return generateRoleInteraction(newGameState, {
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

export const seer_response = (gameState, token, selected_positions, title) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }

  let showCards = []

  const playerCards = selected_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_positions.some((pos) => pos.includes('center'))
  const playerHistory =
    newGameState.players[token].player_history.selectable_cards

  if (
    playerCards &&
    !centerCards &&
    playerHistory.includes(selected_positions[0])
  ) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, [
      selected_positions[0],
    ])
  } else if (
    centerCards &&
    !playerCards &&
    selected_positions.every((position) => playerHistory.includes(position))
  ) {
    showCards = getCardIdsByPositions(
      newGameState?.card_positions,
      selected_positions
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
    card_or_mark_action: true,
    viewed_cards: showCards,
  }

  return generateRoleInteraction(newGameState, {
    private_message: [
      'interaction_saw_card',
      selected_positions[0],
      showCards.length > 1 ? selected_positions[1] : '',
    ],
    icon: 'seer',
    uniqInformations: { viewed_cards: showCards },
  })
}
