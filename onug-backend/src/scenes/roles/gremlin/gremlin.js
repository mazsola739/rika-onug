import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection, validateMarkSelection } from '../../validators'

export const gremlin = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'gremlin') {
      if (card.player_original_id === 33 || (card.player_role_id === 33 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = gremlinInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_gremlin') {
      if (card.player_role_id === 33 && card.player_original_id === 1) {
        interaction = gremlinInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const gremlinInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_two_any'],
    icon: 'swap',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
  })
}

export const gremlinResponse = (gamestate, token, selected_card_positions, selected_mark_positions, title) => {
  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const newGamestate = { ...gamestate }
    const scene = []

    const [position1, position2] = selected_card_positions
    const playerOneCard = { ...newGamestate.card_positions[position1].card }
    const playerTwoCard = { ...newGamestate.card_positions[position2].card }

    newGamestate.card_positions[position1].card = playerTwoCard
    newGamestate.card_positions[position2].card = playerOneCard

    newGamestate.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (currentPlayerNumber === selected_card_positions[0] || currentPlayerNumber === selected_card_positions[1]) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_cards: [position1, position2],
    }

    const messageIdentifiers = formatPlayerIdentifier([position1, position2])

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: 'gremlin',
      uniqueInformations: { gremlin: [position1, position2] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const newGamestate = { ...gamestate }
    const scene = []

    const [position1, position2] = selected_mark_positions
    const playerOneMark = { ...newGamestate.card_positions[position1].mark }
    const playerTwoMark = { ...newGamestate.card_positions[position2].mark }

    newGamestate.card_positions[position1].mark = playerTwoMark
    newGamestate.card_positions[position2].mark = playerOneMark

    newGamestate.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
      newGamestate.players[token].card.player_mark = ''
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]],
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_marks', ...messageIdentifiers],
      icon: 'gremlin',
      uniqueInformations: { gremlin: [selected_mark_positions[0], selected_mark_positions[1]] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate
  }
}
