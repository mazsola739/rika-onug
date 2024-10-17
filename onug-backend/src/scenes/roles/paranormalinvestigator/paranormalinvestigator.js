import { COPY_PLAYER_IDS, SCENE, GOOD_GUY_IDS } from '../../../constants'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'
import { validateCardSelection } from '../../validate-response-data'

export const paranormalinvestigator = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['paranormalinvestigator_kickoff_text']
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 23 || (card.player_role_id === 23 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = paranormalinvestigatorInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const paranormalinvestigatorInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  const limit = selectablePlayerNumbers.length < 2 ? 1 : 2

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : limit === 1 ? 'interaction_may_one_any_other' : 'interaction_may_two_any_other'],
    icon: 'investigator',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 } },
  })
}

export const paranormalinvestigatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const selectedCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0], selected_card_positions[1]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]

  let showCards = []

  if (GOOD_GUY_IDS.includes(playerOneCardId)) {
    if (!GOOD_GUY_IDS.includes(playerTwoCardId)) {
      showCards = selectedCards
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[1]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[1]].card.team
    } else {
      showCards = selectedCards
      if (newGamestate.players[token].card.player_original_id === playerOneCardId || newGamestate.players[token].card.player_original_id === playerTwoCardId) {
        newGamestate.players[token].card.player_card_id = 0
      }
    }
  } else {
    if (!GOOD_GUY_IDS.includes(playerOneCardId)) {
      showCards = [selectedCards[0]]
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
    }
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length === 2 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    icon: 'investigator',
    showCards,
    uniqueInformations: { investigator: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
