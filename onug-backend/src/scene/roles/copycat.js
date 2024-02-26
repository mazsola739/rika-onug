//@ts-check
import { SCENE, centerCardPositions } from '../../constant'
import { getAllPlayerTokens, getCardIdsByPositions } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const copycat = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['copycat_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 30) {
      interaction = copycat_interaction(newGameState, token, title)
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

export const copycat_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: centerCardPositions,
    selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_center'],
    icon: 'copy',
    selectableCards: {
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
    },
  })
}

export const copycat_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  newGameState.players[token].card.player_role_id = newGameState.card_positions[selected_card_positions[0]].id
  newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[0]].role
  newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[0]].team

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])

  newGameState.players[token].player_history.show_cards = showCards 
  newGameState.players[token].new_role_id = newGameState.players[token].card.player_role_id
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: showCards,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_you_are_that_role', `${newGameState.players[token]?.card.player_role}`],
    icon: 'copy',
    showCards: showCards,
    uniqInformations: { new_role_id: newGameState.players[token].card.player_role_id },
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
