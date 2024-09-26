import { ALL_COPY_PLAYER_IDS, SCENE, CENTER_CARD_POSITIONS } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getCardIdsByPositions, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const apprenticeseer = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['apprenticeseer_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 18 || (card.player_role_id === 18 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticeseer_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const apprenticeseer_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_center'],
    icon: 'seer',
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
  })
}

export const apprenticeseer_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const viewCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

  if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'seer',
    showCards: viewCards,
    uniqueInformations: { seer: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
