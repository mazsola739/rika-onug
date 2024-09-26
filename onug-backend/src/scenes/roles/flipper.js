import { COPY_PLAYER_IDS, SCENE, GOOD_GUY_IDS } from '../../constants'
import { getAllPlayerTokens, getSelectableOtherPlayerNumbersWithNoShield, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateCardSelection } from '../validate-response-data'

export const flipper = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'flipper') {
      if (card.player_original_id === 59 || (card.player_role_id === 59 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = flipperInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_flipper') {
      if (card.player_role_id === 59 && card.player_original_id === 1) {
        interaction = flipperInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const flipperInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other'],
    icon: 'idcard',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

//TODO better response message
export const flipperResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card
  const revealedCard = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  const isTown = revealedCard.every((card) => GOOD_GUY_IDS.includes(Object.values(card)[0]))

  if (newGamestate.players[token].card?.original_id === selectedPositionCard.id) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
  }

  if (isTown) {
    newGamestate.flipped.push(revealedCard[0])
    newGamestate.players[token].player_history[title].flipped_cards = revealedCard
  } else {
    newGamestate.players[token].player_history[title].show_cards = revealedCard
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(selected_card_positions)[0]],
    icon: 'idcard',
    showCards: revealedCard,
    uniqueInformations: { idcard: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
