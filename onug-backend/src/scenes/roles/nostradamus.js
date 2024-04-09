//@ts-check
import { allCopyPlayerIds, SCENE, goodGuyIds } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const nostradamus = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['nostradamus_kickoff_text']
  const actionTime = 15

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 80 || (card.player_role_id === 80 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = nostradamus_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const nostradamus_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [selectablePlayerNumbers.length < 3 ? 'interaction_no_selectable_player' : 'interaction_must_three_any'],
    icon: 'nostradamus',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 } },
  })
}

export const nostradamus_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const selectedCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  let showCards = []

  if (goodGuyIds.includes(playerOneCardId)) {
    if (!goodGuyIds.includes(playerTwoCardId)) {
      showCards = [selectedCards[0], selectedCards[1]]
      newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[1]].card.role
      newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[1]].card.team
    } else if (goodGuyIds.includes(playerTwoCardId)) {
      if (!goodGuyIds.includes(playerThreeCardId)) {
        showCards = selectedCards
        newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[2]].card.role
        newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[2]].card.team
      } else {
        showCards = selectedCards
        newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[2]].card.team
        if (newGameState.players[token].card.player_original_id === playerOneCardId || newGameState.players[token].card.player_original_id === playerTwoCardId || newGameState.players[token].card.player_original_id === playerThreeCardId) {
          newGameState.players[token].card.player_card_id = 0
        }
      }
    }
  } else if (!goodGuyIds.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]
    newGameState.players[token].card.player_role = newGameState.card_positions[selected_card_positions[0]].card.role
    newGameState.players[token].card.player_team = newGameState.card_positions[selected_card_positions[0]].card.team
  }

  newGameState.players[token].card_or_mark_action = true
  newGameState.nostradamus_team = newGameState.players[token].card.player_team

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message : ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length >= 2 ? formatPlayerIdentifier(selected_card_positions)[1] : '', showCards.length === 3 ? formatPlayerIdentifier(selected_card_positions)[2] : '' ],
    icon: 'nostradamus',
    showCards,
    uniqueInformations: { nostradamus: showCards.length === 3 ? selected_card_positions.slice(0, 3) : showCards.length === 2 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

const getNostradamusTeam = (team) => !team ? 'nostradamus_team_villager_text' : `nostradamus_team_${team}_text`

export const nostradamus_reaction = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const nostradamusTeam = getNostradamusTeam(newGameState.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]
  const actionTime = 6

  tokens.forEach((token) => { scene.push({ type: SCENE, title, token, narration })})

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}
