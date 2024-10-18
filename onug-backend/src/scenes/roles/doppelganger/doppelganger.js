import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection } from '../../validators'

//TODO if oracle is oracle team
export const doppelganger = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['doppelganger_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 1) {
      interaction = doppelgangerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

//TODO shield?
export const doppelgangerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any_other'],
    icon: 'copy',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const doppelgangerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  newGamestate.players[token].card.player_role_id = newGamestate.card_positions[selected_card_positions[0]].card.id
    
  if (newGamestate.card_positions[selected_card_positions[0]].card.id === 30 || newGamestate.card_positions[selected_card_positions[0]].card.id === 64) {
    newGamestate.players[token].card.player_role = 'VILLAGER'
    newGamestate.players[token].card.player_team = 'villager'
  } else {
    newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
    newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
  }

  const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])

    ; (newGamestate.players[token].player_history[title].show_cards = showCards), (newGamestate.players[token].new_role_id = newGamestate.players[token].card.player_role_id)
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_you_are_that_role', `${newGamestate.players[token]?.card.player_role}`],
    icon: 'copy',
    showCards,
    uniqueInformations: { new_role_id: newGamestate.players[token].card.player_role_id, copy: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
