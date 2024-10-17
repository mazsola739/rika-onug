import { ALL_COPY_PLAYER_IDS, SCENE, GOOD_GUY_IDS } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

export const nostradamus = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['nostradamus_kickoff_text']
  const actionTime = 15

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 80 || (card.player_role_id === 80 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = nostradamusInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const nostradamusInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length < 3 ? 'interaction_no_selectable_player' : 'interaction_must_three_any'],
    icon: 'nostradamus',
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 3, center: 0 } },
  })
}

export const nostradamusResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const selectedCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  let showCards = []

  if (GOOD_GUY_IDS.includes(playerOneCardId)) {
    if (!GOOD_GUY_IDS.includes(playerTwoCardId)) {
      showCards = [selectedCards[0], selectedCards[1]]
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[1]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[1]].card.team
    } else if (GOOD_GUY_IDS.includes(playerTwoCardId)) {
      if (!GOOD_GUY_IDS.includes(playerThreeCardId)) {
        showCards = selectedCards
        newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[2]].card.role
        newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[2]].card.team
      } else {
        showCards = selectedCards
        newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[2]].card.team
        if (newGamestate.players[token].card.player_original_id === playerOneCardId || newGamestate.players[token].card.player_original_id === playerTwoCardId || newGamestate.players[token].card.player_original_id === playerThreeCardId) {
          newGamestate.players[token].card.player_card_id = 0
        }
      }
    }
  } else if (!GOOD_GUY_IDS.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]
    newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
    newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
  }

  newGamestate.players[token].card_or_mark_action = true
  newGamestate.nostradamus_team = newGamestate.players[token].card.player_team

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message : ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length >= 2 ? formatPlayerIdentifier(selected_card_positions)[1] : '', showCards.length === 3 ? formatPlayerIdentifier(selected_card_positions)[2] : '' ],
    icon: 'nostradamus',
    showCards,
    uniqueInformations: { nostradamus: showCards.length === 3 ? selected_card_positions.slice(0, 3) : showCards.length === 2 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

const getNostradamusTeam = (team) => !team ? 'nostradamus_team_villager_text' : `nostradamus_team_${team}_text`

export const nostradamus_reaction = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const nostradamusTeam = getNostradamusTeam(newGamestate.nostradamus_team)
  const narration = ['nostradamus_teamstart_text', nostradamusTeam]
  const actionTime = 6

  tokens.forEach((token) => { scene.push({ type: SCENE, title, token, narration })})

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
