//@ts-check
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'
import {
  getAllPlayerTokens,
  getNonWerewolfPlayerNumbersByRoleIds,
} from '../../utils/scene-utils'
import { SCENE } from '../../constant'

export const alphawolf = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['alphawolf_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 17 || (newGameState.players[token].card.player_role_id === 17 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 17 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = alphawolf_interaction(newGameState, token, title)
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

export const alphawolf_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_one_any_non_werewolf'],
    icon: 'claw',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const alphawolf_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const centerWolf = { ...newGameState.card_positions.center_wolf.card }
  const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]].card }
  newGameState.card_positions.center_wolf.card = selectedCard
  newGameState.card_positions[selected_card_positions[0]].card = centerWolf

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [selected_card_positions[0], 'center_wolf'],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', selected_card_positions[0], 'center_wolf'],
    icon: 'claw',
    uniqInformations: { swapped_cards: [selected_card_positions[0], 'center_wolf'], claw: [selected_card_positions[0]] },
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
