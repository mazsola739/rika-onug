import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken, getMarksByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateMarkSelection } from '../validate-response-data'

export const pickpocket = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'pickpocket') {
      if (card.player_original_id === 36 || (card.player_role_id === 36 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_pickpocket') {
      if (card.player_role_id === 36 && card.player_original_id === 1) {
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const pickpocketInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'robber',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}

export const pickpocketResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerMark = newGamestate.card_positions[currentPlayerNumber].mark 
  const selectedMark = newGamestate.card_positions[selected_mark_positions[0]].mark 
  newGamestate.card_positions[currentPlayerNumber].mark = selectedMark
  newGamestate.card_positions[selected_mark_positions[0]].mark = currentPlayerMark

  newGamestate.players[token].card.player_mark = newGamestate.card_positions[currentPlayerNumber].mark

  const viewMarks = getMarksByPositions(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_marks: [currentPlayerNumber, selected_mark_positions[0]],
    viewed_marks: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_marks', ...messageIdentifiers, 'interaction_own_mark'],
    icon: 'robber',
    showMarks: viewMarks,
    uniqueInformations: { robber: [currentPlayerNumber, selected_mark_positions[0]], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
