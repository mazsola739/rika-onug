//@ts-check
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { getAllPlayerTokens } from '../../utils/scene'
import { isValidCardSelection } from '../validate-response-data'
import { getSelectableOtherPlayersWithoutShield } from '../../utils/scene'
import { SCENE } from '../../constant'

export const troublemaker = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['troublemaker_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 11 || (newGameState.players[token].card.player_role_id === 11 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 11 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = troublemaker_interaction(newGameState, token, title)
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

export const troublemaker_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(
    newGameState.players,
    token
  )

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_two_any_other'],
    icon: 'swap',
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 2, center: 0 },
    },
  })
}

export const troublemaker_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const [position1, position2] = selected_card_positions
  const playerOneCard = { ...newGameState.card_positions[position1].card }
  const playerTwoCard = { ...newGameState.card_positions[position2].card }

  newGameState.card_positions[position1].card = playerTwoCard
  newGameState.card_positions[position2].card = playerOneCard

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [position1, position2],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', position1, position2],
    icon: 'swap',
    uniqInformations: { swapped_cards: [position1, position2] },
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
