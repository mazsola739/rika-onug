//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithoutShield, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const robber = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['robber_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 8 || (card.player_role_id === 8 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = robber_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const robber_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  if (!newGameState.players[token].shield) {
    const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithoutShield(
      newGameState.players,
      token
    )

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_may_one_any_other'],
      icon: 'robber',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
    })
  }
}

export const robber_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerCard = { ...newGameState.card_positions[currentPlayerNumber].card }
  const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]].card }
  newGameState.card_positions[currentPlayerNumber].card = selectedCard
  newGameState.card_positions[selected_card_positions[0]].card = currentPlayerCard

  newGameState.players[token].card.player_card_id = newGameState.card_positions[currentPlayerNumber].card.id
  newGameState.players[token].card.player_team = newGameState.card_positions[currentPlayerNumber].card.team

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [currentPlayerNumber])

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_saw_card', formatPlayerIdentifier([currentPlayerNumber])[0]],
    icon: 'robber',
    showCards: showCards,
    uniqInformations: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]], viewed_cards: [currentPlayerNumber] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
