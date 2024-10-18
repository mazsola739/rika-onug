import { CENTER_CARD_POSITIONS, COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection } from '../../validators'

export const seer = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['seer_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 9 || (card.player_role_id === 9 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = seerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const seerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS], selectable_card_limit: { player: 1, center: 2 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other', 'conjunction_or', 'interaction_seer_end'],
    icon: 'seer',
    selectableCards: { selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS], selectable_card_limit: { player: 1, center: 2 } },
  })
}

export const seerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
 
  const newGamestate = { ...gamestate }
  const scene = []

  let showCards = []

  const playerCards = selected_card_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_card_positions.some((pos) => pos.includes('center'))
  const playerHistory = newGamestate.players[token].player_history[title].selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_card_positions[0])) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, [selected_card_positions[0]])
  } else if (centerCards && !playerCards && selected_card_positions.every((position) => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, selected_card_positions.slice(0, 2))
  } else {
    return newGamestate
  }

  if (showCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  const viewedCards = showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: title === 'SEER' ? 'seer' : 'detector',
    showCards,
    uniqueInformations: { seer: title === 'SEER' ? viewedCards : [], detector: title === 'DETECTOR' ? viewedCards : []},
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
