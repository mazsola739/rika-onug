import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateCardSelection } from '../validate-response-data'

export const mysticwolf = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['mysticwolf_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 22 || (card.player_role_id === 22 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = mysticwolfInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const mysticwolfInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other'],
    icon: title === 'MYSTIC_WOLF' ? 'mystic' : 'peeker',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const mysticwolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card
  const viewCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])

  if (newGamestate.players[token]?.card?.original_id === selectedPositionCard.id) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: title === 'MYSTIC_WOLF' ? 'mystic' : 'peeker',
    showCards: viewCards,
    uniqueInformations: { mystic: title === 'MYSTIC_WOLF' ? [selected_card_positions[0]] : [], peeker: title === 'DR_PEEKER' ? [selected_card_positions[0]] : [], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
