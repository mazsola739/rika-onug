//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getCardIdsByPositions,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { isValidCardSelection } from '../validate-response-data'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

export const mysticwolf = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['mysticwolf_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 22  || (newGameState.players[token].card.player_role_id === 22 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 22 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = mysticwolf_interaction(newGameState, token, title)
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

export const mysticwolf_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'spy',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const mysticwolf_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card
  const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])

  if (newGameState.players[token]?.card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', selected_card_positions[0]],
    icon: 'spy',
    showCards: viewCards,
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
}
