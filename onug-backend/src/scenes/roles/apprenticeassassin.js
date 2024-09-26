import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getAssassinPlayerNumbersByRoleIds, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const apprenticeassassin = (gamestate, title, hasAssassin, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, hasAssassin ? 'apprenticeassassin_assassin_text' : 'apprenticeassassin_alone_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'apprenticeassassin') {
      if (card.player_original_id === 28 || (card.player_role_id === 28 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = apprenticeassassin_interaction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_apprenticeassassin') {
      if (card.player_role_id === 28 && card.player_original_id === 1) {
        interaction = apprenticeassassin_interaction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const apprenticeassassin_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const assassins = getAssassinPlayerNumbersByRoleIds(newGamestate.players)

  if (assassins.length > 0) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      assassins,
    }

    const messageIdentifiers = formatPlayerIdentifier(assassins)

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_assassin', ...messageIdentifiers],
      icon: 'assassin',
      uniqueInformations: { assassins },
    })
  } else if (assassins.length === 0) {
    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_may_one_any'],
      icon: 'target',
      selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    })
  }
}

export const apprenticeassassin_response = (gamestate, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const assassinPosition = newGamestate.doppelganger_mark_positions.assassin
    const selectedPosition =
      newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
  } else {
    const assassinPosition = newGamestate.mark_positions.assassin
    const selectedPosition =
      newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
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
