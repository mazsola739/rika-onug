//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getAnyEvenOrOddPlayers, getAnySeerPlayerNumbersByRoleIdsWithoutShield, getCardIdsByPositions, formatPlayerIdentifier } from '../../utils'
import { isValidCardSelection } from '../validate-response-data';
import { generateRoleInteraction } from './../generate-scene-role-interactions';

const randomPsychicInstructions = ['psychic_view1_text', 'psychic_view2_text']
const psychicKeys = ['identifier_anyeven_text', 'identifier_anyodd_text']

export const psychic = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const total_players = newGameState.total_players

  let availablePsychicOptions = []

  if (total_players === 3) {
    availablePsychicOptions = randomPsychicInstructions.filter(option => !option.includes('view2'))
  }

  const narration = [`${prefix}_kickoff_text`, getRandomItemFromArray(availablePsychicOptions), getRandomItemFromArray(psychicKeys)]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'psychic') {
      if (card.player_original_id === 51 || (card.player_role_id === 51 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = psychic_interaction(newGameState, token, title, randomPsychicInstructions, psychicKeys)
      }
    } else if (prefix === 'doppelganger_psychic') {
      if (card.player_role_id === 51 && card.player_original_id === 1) {
        interaction = psychic_interaction(newGameState, token, title, randomPsychicInstructions, psychicKeys)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const psychic_interaction = (gameState, token, title, randomPsychicInstructions, psychicKeys) => {
  const newGameState = { ...gameState }
  
  const evenOrOdd = psychicKeys.replace('identifier_', '').replace('_text', '').replace('any', '')
  const selectablePlayers = getAnyEvenOrOddPlayers(newGameState.players, evenOrOdd)
  const selectablePlayerNumbers = getAnySeerPlayerNumbersByRoleIdsWithoutShield(selectablePlayers)

  const limit = +randomPsychicInstructions.replace('psychic_view', '').replace('_text', '')

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : limit === 1 ? 'interaction_may_one_any_other' : 'interaction_may_two_any'],
    icon: 'id',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 } },
  })
}

export const psychic_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const limit = newGameState.players[token].player_history.selectable_card_limit.player
  const showCards = getCardIdsByPositions(newGameState?.card_positions, selected_card_positions.slice(0, limit))

  if (showCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
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
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: 'seer',
    uniqInformations: { viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
