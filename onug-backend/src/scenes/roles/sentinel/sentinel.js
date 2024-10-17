import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerTokensByPlayerNumber, getSceneEndTime, getSelectableOtherPlayerNumbersWithNoShield } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

export const sentinel = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['sentinel_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 25 || (card.player_role_id === 25 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = sentinelInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const sentinelInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other'],
    icon: 'sentinel',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const sentinelResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const shieldedPlayerToken = getPlayerTokensByPlayerNumber(newGamestate.players, selected_card_positions[0])

  if (shieldedPlayerToken) {
    newGamestate.shield.push(selected_card_positions[0])
    newGamestate.players[shieldedPlayerToken[0]].shield = true
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    new_shield_card: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_placed_shield', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'sentinel',
    uniqueInformations: { sentinel: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
