//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getNonVampirePlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

const createTheCount = prefix => [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

export const thecount = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createTheCount(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'thecount') {
      if (card.player_original_id === 39 || (card.player_role_id === 39 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = thecount_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (card.player_role_id === 39 && card.player_original_id === 1) {
        interaction = thecount_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const thecount_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGameState)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'fear',
    selectableCards: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
  })
}

export const thecount_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const fearPosition = newGameState.doppelganger_mark_positions.fear
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.fear = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = fearPosition
  } else {
    const fearPosition = newGameState.mark_positions.fear
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.fear = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = fearPosition
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_fear: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_fear', selected_mark_positions[0]],
    icon: 'fear',
    uniqInformations: { mark_of_fear: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
