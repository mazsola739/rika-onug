import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection } from '../../validators'

export const getNonVillainPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!IDS.ALL_SUPER_VILLAIN_IDS.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const temptress = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['temptress_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}
 
    const card = newGamestate.players[token].card

    if (card.player_original_id === 69 || (card.player_role_id === 69 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = temptressInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const temptressInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getNonVillainPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_villain'],
    icon: 'evilhand',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const temptressResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const centerVillain = { ...newGamestate.card_positions.center_villain.card }
  const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
  newGamestate.card_positions.center_villain.card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = centerVillain

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_villain'],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_villain'])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    icon: 'evilhand',
    uniqueInformations: { swap: [selected_card_positions[0], 'center_villain'], evilhand: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
