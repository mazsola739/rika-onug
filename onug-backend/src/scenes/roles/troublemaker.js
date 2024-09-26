import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getSceneEndTime, getSelectableOtherPlayerNumbersWithNoShield } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const troublemaker = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []  
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['troublemaker_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 11 || (card.player_role_id === 11 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = troublemaker_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const troublemaker_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length >= 2 ? 'interaction_may_two_any_other' : 'interaction_no_selectable_player'],
    icon: 'swap',
    selectableCards: { selectable_cards: selectablePlayerNumbers.length >= 2 ? selectablePlayerNumbers : [], selectable_card_limit: { player: selectablePlayerNumbers.length >= 2 ? 2 : 0, center: 0 } },
  })
}

export const troublemaker_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const [position1, position2] = selected_card_positions.slice(0, 2)
  const playerOneCard = { ...newGamestate.card_positions[position1].card }
  const playerTwoCard = { ...newGamestate.card_positions[position2].card }

  newGamestate.card_positions[position1].card = playerTwoCard
  newGamestate.card_positions[position2].card = playerOneCard

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [position1, position2],
  }

  const messageIdentifiers = formatPlayerIdentifier([position1, position2])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    icon: 'swap',
    uniqueInformations: { swap: [position1, position2] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
