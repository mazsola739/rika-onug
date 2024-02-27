//@ts-check
import { SCENE } from '../../constant'
import {
  getAllPlayerTokens,
  getPlayerTokenByPlayerNumber,
  getSelectableOtherPlayersWithoutShield,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const sentinel = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['sentinel_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 25 || (newGameState.players[token].card.player_role_id === 25 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 25 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = sentinel_interaction(newGameState, token, title)
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

export const sentinel_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
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
    icon: 'shield',
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    },
  })
}

export const sentinel_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const shieldedPlayerToken = getPlayerTokenByPlayerNumber(
    newGameState.players,
    selected_card_positions[0]
  )

  if (shieldedPlayerToken) {
    newGameState.shield.push(selected_card_positions[0])
    newGameState.players[shieldedPlayerToken[0]].shield = true
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    new_shield_card: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_placed_shield', selected_card_positions[0]],
    icon: 'shield',
    uniqInformations: { new_shield_card: [selected_card_positions[0]] },
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
