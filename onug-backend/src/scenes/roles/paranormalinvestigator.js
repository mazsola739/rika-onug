//@ts-check
import { copyPlayerIds, SCENE, goodGuyIds } from '../../constant'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithoutShield, getCardIdsByPositions, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const paranormalinvestigator = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['paranormalinvestigator_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 23 || (card.player_role_id === 23 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = paranormalinvestigator_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const paranormalinvestigator_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithoutShield(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_two_any_other'],
    icon: 'investigator',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 2, center: 0 } },
  })
}

export const paranormalinvestigator_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const selectedCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0], selected_card_positions[1]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]

  let showCards = []

  if (goodGuyIds.includes(playerOneCardId)) {
    if (!goodGuyIds.includes(playerTwoCardId)) {
      showCards = selectedCards
      newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[1]].card.role
      newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[1]].card.team
    } else {
      showCards = selectedCards
      if (newGameState.players[token].card.player_original_id === playerOneCardId || newGameState.players[token].card.player_original_id === playerTwoCardId) {
        newGameState.players[token].card.player_card_id = 0
      }
    }
  } else {
    if (!goodGuyIds.includes(playerOneCardId)) {
      showCards = [selectedCards[0]]
      newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[0]].card.role
      newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[0]].card.team
    }
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length === 2 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: 'investigator',
    showCards: showCards,
    uniqInformations: { viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
