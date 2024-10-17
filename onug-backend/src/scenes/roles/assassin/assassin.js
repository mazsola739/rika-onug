import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateMarkSelection } from '../../validate-response-data'

export const assassin = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'assassin') {
      if (card.player_original_id === 29 || (card.player_role_id === 29 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = assassinInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (card.player_role_id === 29 && card.player_original_id === 1) {
        interaction = assassinInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const assassinInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

  const privateMessage = 
  
  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any'],
    icon: 'target',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}

export const assassinResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const assassinPosition = newGamestate.doppelganger_mark_positions.assassin
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = assassinPosition
  } else {
    const assassinPosition = newGamestate.mark_positions.assassin
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGamestate.players[token].card.player_mark = 'mark_of_assassin'
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_assassin: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_assassin', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'target',
    uniqueInformations: { mark_of_assassin: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
