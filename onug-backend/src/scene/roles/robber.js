//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPlayerNumbers,
  getPlayerNumbersWithMatchingTokens,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

export const robber = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['robber_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 8) {
      interaction = robber_interaction(newGameState, token)
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

export const robber_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  if (!newGameState.players[token].shield) {
    const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
      newGameState.players,
      token
    )

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    }

    return generateRoleInteraction(newGameState, {
      private_message: ['interaction_may_one_any_other'],
      icon: 'robber',
      selectableCards: {
        selectable_cards: selectablePlayerNumbers,
        selectable_card_limit: { player: 1, center: 0 },
      },
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
    })
  }
}

export const robber_response = (
  gameState,
  token,
  selected_positions,
  title
) => {
  if (
    !isValidSelection(
      selected_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(
    newGameState.players,
    [token]
  )[0]
  const robberCard = { ...newGameState.card_positions[robberPlayerNumber] }
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] }
  newGameState.card_positions[robberPlayerNumber] = selectedCard
  newGameState.card_positions[selected_positions[0]] = robberCard

  newGameState.players[token].card.player_card_id =
    newGameState.card_positions[robberPlayerNumber].id
  newGameState.players[token].card.player_team =
    newGameState.card_positions[robberPlayerNumber].team

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [
    robberPlayerNumber,
  ])

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    swapped_cards: [
      `player_${newGameState.players[token].player_number}`,
      selected_positions[0],
    ],
    viewed_cards: [`player_${newGameState.players[token].player_number}`],
  }

  return generateRoleInteraction(newGameState, {
    private_message: [
      'interaction_swapped_cards',
      'interaction_saw_card',
      `player_${newGameState.players[token].player_number}`,
    ],
    icon: 'robber',
    showCards: showCards,
    uniqInformations: {
      swapped_cards: [
        `player_${newGameState.players[token].player_number}`,
        selected_positions[0],
      ],
      viewed_cards: [`player_${newGameState.players[token].player_number}`],
    },
  })
}
