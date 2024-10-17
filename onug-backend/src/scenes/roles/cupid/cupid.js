import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateMarkSelection } from '../../validate-response-data'

export const cupid = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['cupid_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 31 || (card.player_role_id === 31 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = cupidInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const cupidInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_two_any'],
    icon: 'cupid',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
  })
}

export const cupidResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const loveOnePosition = newGamestate.doppelganger_mark_positions.love_1
    const loveTwoPosition = newGamestate.doppelganger_mark_positions.love_2
    const selectedOnePosition = newGamestate.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = newGamestate.card_positions[selected_mark_positions[1]].mark

    newGamestate.doppelganger_mark_positions.love_1 = selectedOnePosition
    newGamestate.doppelganger_mark_positions.love_2 = selectedTwoPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    newGamestate.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  } else {
    const loveOnePosition = newGamestate.mark_positions.love_1
    const loveTwoPosition = newGamestate.mark_positions.love_2
    const selectedOnePosition = newGamestate.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = newGamestate.card_positions[selected_mark_positions[1]].mark

    newGamestate.mark_positions.love_1 = selectedOnePosition
    newGamestate.mark_positions.love_2 = selectedTwoPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    newGamestate.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

  if (currentPlayerNumber[0] === selected_mark_positions[0] || currentPlayerNumber[0] === selected_mark_positions[1]) {
    newGamestate.players[token].card.player_mark = 'mark_of_love'
  }
  
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_love: [selected_mark_positions[0], selected_mark_positions[1]],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_love', ...messageIdentifiers],
    icon: 'cupid',
    uniqueInformations: { mark_of_love: [selected_mark_positions[0], selected_mark_positions[1]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
