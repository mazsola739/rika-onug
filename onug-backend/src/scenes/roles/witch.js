import { COPY_PLAYER_IDS, SCENE, CENTER_CARD_POSITIONS } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, formatPlayerIdentifier, getPlayerNumberWithMatchingToken } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const witch = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['witch_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 27 || (card.player_role_id === 27 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = witch_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const witch_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_center'],
    icon: title === 'WITCH' ? 'witch' : 'voodoo',
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
  })
} 

export const witch_response = (gamestate, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedCenterCardPosition = newGamestate.card_positions[selected_card_positions[0]].card

    if (newGamestate.players[token].card.player_original_id === selectedCenterCardPosition.id) {
      newGamestate.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

    

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
      viewed_cards: [selected_card_positions[0]],
      selected_center_card: selected_card_positions[0],
    }

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
      icon: title === 'WITCH' ? 'witch' : 'voodoo',
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 1, center: 0 } },
      showCards,
      uniqueInformations: { witch: title === 'WITCH' ? [selected_card_positions[0]] : [], voodoo: title === 'VOODOO' ? [selected_card_positions[0]] : [], },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate

  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard = newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_center_card].card
    const selectedPlayerPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_center_card].card = selectedPlayerCard
    newGamestate.card_positions[selected_card_positions[0]].card = selectedCenterCard

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (selected_card_positions[0] === currentPlayerNumber[0]) {
      const currentCard = newGamestate.card_positions[currentPlayerNumber[0]].card
      newGamestate.players[token].card.player_card_id = currentCard.id
      newGamestate.players[token].card.player_team = currentCard.team
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_cards: [newGamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]],
    }

    const messageIdentifiers = formatPlayerIdentifier([`${newGamestate.players[token].player_history[title].selected_center_card}`, selected_card_positions[0]])

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: title === 'WITCH' ? 'witch' : 'voodoo',
      uniqueInformations: { witch: title === 'WITCH' ? [newGamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]] : [], voodoo: title === 'VOODOO' ? [newGamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]] : [], },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate
  }
}


