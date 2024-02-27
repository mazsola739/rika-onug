//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const cupid = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['cupid_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 31 || (newGameState.players[token].card.player_role_id === 31 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 31 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = cupid_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const cupid_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 2 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ["interaction_must_two_any"],
    icon: 'cupid',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
  })
}

export const cupid_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const loveOnePosition = newGameState.doppelganger_mark_positions.love_1
    const loveTwoPosition = newGameState.doppelganger_mark_positions.love_2
    const selectedOnePosition = newGameState.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = newGameState.card_positions[selected_mark_positions[1]].mark

    newGameState.doppelganger_mark_positions.love_1 = selectedOnePosition
    newGameState.doppelganger_mark_positions.love_2 = selectedTwoPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    newGameState.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  } else {
    const loveOnePosition = newGameState.mark_positions.love_1
    const loveTwoPosition = newGameState.mark_positions.love_2
    const selectedOnePosition = newGameState.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = newGameState.card_positions[selected_mark_positions[1]].mark

    newGameState.mark_positions.love_1 = selectedOnePosition
    newGameState.mark_positions.love_2 = selectedTwoPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    newGameState.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  }

  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

  if (currentPlayerNumber[0] === selected_mark_positions[0] || currentPlayerNumber[0] === selected_mark_positions[1]) {
    newGameState.players[token].card.player_mark = "mark_of_love"
  }
  
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_love: [selected_mark_positions[0], selected_mark_positions[1]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_love', selected_mark_positions[0], selected_mark_positions[1]],
    icon: 'cupid',
    uniqInformations: { mark_of_love: [selected_mark_positions[0], selected_mark_positions[1]] },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
