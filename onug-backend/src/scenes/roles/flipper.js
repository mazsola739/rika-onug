//@ts-check
import { copyPlayerIds, SCENE, goodGuyIds } from '../../constant'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const createFlipper = prefix => [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']

export const flipper = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createFlipper(prefix)
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'flipper') {
      if (card.player_original_id === 59 || (card.player_role_id === 59 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = flipper_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_flipper') {
      if (card.player_role_id === 59 && card.player_original_id === 1) {
        interaction = flipper_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const flipper_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other'],
    icon: 'idcard',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

//TODO better response message
export const flipper_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card
  const revealedCard = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
  const isTown = revealedCard.every((card) => goodGuyIds.includes(Object.values(card)[0]))

  if (newGameState.players[token].card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
  }

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].player_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].player_history.show_cards = revealedCard
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'idcard',
    showCards: revealedCard,
    uniqueInformations: { idcard: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
