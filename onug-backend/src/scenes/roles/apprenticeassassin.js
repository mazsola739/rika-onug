//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getAssassinNumberByRoleIds, getPlayerNumberWithMatchingToken, getPlayerNumbersWithMatchingTokens } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

const createApprenticeAssassin = (hasAssassin, prefix) => [
  `${prefix}_kickoff_text`,
  hasAssassin
    ? 'apprenticeassassin_assassin_text'
    : 'apprenticeassassin_alone_text',
]

export const apprenticeassassin = (gameState, title, hasAssassin, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createApprenticeAssassin(hasAssassin, prefix)

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'apprenticeassassin') {
      if (
        newGameState.players[token].card.player_original_id === 28 ||
        (newGameState.players[token].card.player_role_id === 28 &&
          newGameState.players[token].card.player_original_id === 30) ||
        (newGameState.players[token].card.player_role_id === 28 &&
          newGameState.players[token].card.player_original_id === 64)
      ) {
        interaction = apprenticeassassin_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_apprenticeassassin') {
      if (
        newGameState.players[token].card.player_role_id === 28 &&
        newGameState.players[token].card.player_original_id === 1
      ) {
        interaction = apprenticeassassin_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const apprenticeassassin_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const assassin = getAssassinNumberByRoleIds(newGameState.players)

  if (assassin.length > 0) {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      assassin: assassin,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_assassin'],
      icon: 'assassin',
      uniqInformations: { assassin: assassin },
    })
  } else if (assassin.length === 0) {
    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_may_one_any'],
      icon: 'target',
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    })
  }
}

export const apprenticeassassin_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const assassinPosition = newGameState.doppelganger_mark_positions.assassin
    const selectedPosition =
      newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.assassin = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
  } else {
    const assassinPosition = newGameState.mark_positions.assassin
    const selectedPosition =
      newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.assassin = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(
    newGameState.players,
    token
  )

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGameState.players[token].card.player_mark = 'mark_of_assassin'
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_assassin: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_mark_of_assassin',
      selected_mark_positions[0],
    ],
    icon: 'target',
    uniqInformations: { mark_of_assassin: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
