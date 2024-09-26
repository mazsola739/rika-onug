import { COPY_PLAYER_IDS, SCENE, CENTER_CARD_POSITIONS } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateCardSelection } from '../validate-response-data'

export const drunk = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['drunk_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 2 || (card.player_role_id === 2 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = drunkInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const drunkInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  if (!newGamestate.players[token].shield) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_one_center'],
      icon: 'drunk',
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }
}

export const drunkResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
  const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
  newGamestate.card_positions[currentPlayerNumber].card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard

  newGamestate.players[token].card.player_card_id = 0
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    icon: 'drunk',
    uniqueInformations: { drunk: [currentPlayerNumber, selected_card_positions[0]], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
