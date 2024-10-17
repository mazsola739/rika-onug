import { SCENE, CENTER_CARD_POSITIONS } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getCardIdsByPositions, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

//TODO if oracle is oracle team
export const copycat = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['copycat_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 30) {
      interaction = copycatInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const copycatInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_center'],
    icon: 'copy',
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
  })
}

export const copycatResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  newGamestate.players[token].card.player_role_id = newGamestate.card_positions[selected_card_positions[0]].card.id
    
  if (newGamestate.card_positions[selected_card_positions[0]].card.id === 1 || newGamestate.card_positions[selected_card_positions[0]].card.id === 30 || newGamestate.card_positions[selected_card_positions[0]].card.id === 64) {
    newGamestate.players[token].card.player_role = 'VILLAGER'
    newGamestate.players[token].card.player_team = 'villager'
  } else {
    newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
    newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
  }

  const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])

  newGamestate.players[token].new_role_id = newGamestate.players[token].card.player_role_id
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_you_are_that_role', `${newGamestate.players[token]?.card.player_role}`],
    icon: 'copy',
    showCards,
    uniqueInformations: { copy: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
