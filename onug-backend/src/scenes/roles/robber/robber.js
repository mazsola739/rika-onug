import { COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection } from '../../validators'

export const robber = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['robber_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 8 || (card.player_role_id === 8 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = robberInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const robberInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  if (!newGamestate.players[token].shield) {
    const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other'],
      icon: title === 'ROBBER' ? 'robber' : 'dog',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
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

export const robberResponse = (gamestate, token, selected_card_positions, title) => {
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

  newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
  newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team

  const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_own_card'],
    icon: title === 'ROBBER' ? 'robber' : 'dog',
    showCards,
    uniqueInformations: { robber: title === 'ROBBER' ? [currentPlayerNumber, selected_card_positions[0]] : [], dog: title === 'ROLE_RETRIEVER' ? [currentPlayerNumber, selected_card_positions[0]] : [], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
