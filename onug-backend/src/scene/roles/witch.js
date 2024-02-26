//@ts-check
import { SCENE, centerCardPositions } from '../../constant'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'
import {
  getPlayerNumbersWithMatchingTokens,
  getSelectablePlayersWithNoShield,
  getAllPlayerTokens,
  getCardIdsByPositions,
} from '../../utils/scene'

export const witch = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['witch_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 27 || (newGameState.players[token].card.role_id === 27 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 27 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = witch_interaction(newGameState, token, title)
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

export const witch_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: centerCardPositions,
    selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_center'],
    icon: 'voodoo',
    selectableCards: {
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}

export const witch_response = (gameState, token, selected_card_positions, title) => {
  if (
    !isValidCardSelection(
      selected_card_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(newGameState.card_positions, [
      selected_card_positions[0],
    ])
    const selectedCenterCardPosition =
      newGameState.card_positions[selected_card_positions[0]]

    if (
      newGameState.players[token].card.original_id ===
      selectedCenterCardPosition.id
    ) {
      newGameState.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(
      newGameState.players,
      allPlayerTokens
    )
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(
      selectablePlayerNumbers,
      newGameState.shield
    )

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
      viewed_cards: [selected_card_positions[0]],
      selected_center_card: selected_card_positions[0],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: [
        'interaction_saw_card',
        selected_card_positions[0],
        'interaction_must_one_any',
      ],
      icon: 'voodoo',
      selectableCards: {
        selectable_cards: centerCardPositions,
        selectable_card_limit: { player: 1, center: 0 },
      },
      showCards: showCards,
      uniqInformations: { viewed_cards: [selected_card_positions[0]] },
    })

    scene.push({
      type: SCENE,
      title,
      token,
      interaction,
    })
    newGameState.scene = scene

    return newGameState

  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard =
      newGameState.card_positions[
      newGameState.players[token].player_history.selected_center_card
      ]
    const selectedPlayerPositionCard =
      newGameState.card_positions[selected_card_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGameState.card_positions[
      newGameState.players[token].player_history.selected_center_card
    ] = selectedPlayerCard
    newGameState.card_positions[selected_card_positions[0]] = selectedCenterCard

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(
      newGameState.players,
      [token]
    )

    if (selected_card_positions[0] === witchPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[witchPlayerNumber[0]]
      newGameState.players[token].card.player_card_id = currentCard.id
      newGameState.players[token].card.player_team = currentCard.team
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      swapped_cards: [
        newGameState.players[token].player_history.selected_center_card,
        selected_card_positions[0],
      ],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: [
        'interaction_saw_card',
        'interaction_swapped_cards',
        `${newGameState.players[token].player_history.selected_center_card}`,
        selected_card_positions[0],
      ],
      icon: 'voodoo',
      uniqInformations: {
        swapped_cards: [
          newGameState.players[token].player_history.selected_center_card,
          selected_card_positions[0],
        ],
      },
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
}


